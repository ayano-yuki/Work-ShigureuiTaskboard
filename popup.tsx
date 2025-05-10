import { useEffect, useState } from "react"

import "~/main.css"

// YouTube URL 判定
const isYouTubeVideoPage = (url: string): boolean =>
  url.includes("youtube.com/watch?v=") ||
  url.includes("youtube.com/live/") ||
  url.includes("youtube.com/shorts/")

// YouTube 動画ID抽出
const extractYouTubeVideoId = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url)
    if (parsedUrl.pathname === "/watch") {
      return parsedUrl.searchParams.get("v")
    } else if (parsedUrl.pathname.startsWith("/live/")) {
      return parsedUrl.pathname.split("/live/")[1]
    } else if (parsedUrl.pathname.startsWith("/shorts/")) {
      return parsedUrl.pathname.split("/shorts/")[1]
    }
  } catch {
    return null
  }
  return null
}

// 動画情報を localStorage に保存
const saveVideoInfoToLocalStorage = (videoId: string, title: string) => {
  const savedData: [string, string][] = JSON.parse(
    localStorage.getItem("youtubeVideos") || "[]"
  )
  savedData.push([videoId, title])
  localStorage.setItem("youtubeVideos", JSON.stringify(savedData))
}

function IndexPopup() {
  const [videoInfo, setVideoInfo] = useState<{
    id: string
    title: string
  } | null>(null)
  const [isNewTabPage, setIsNewTabPage] = useState(false)
  const [message, setMessage] = useState("")

  // 初回タブ情報取得
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      const url = tab?.url || ""
      if (url.startsWith("chrome://newtab") || url === "") {
        setIsNewTabPage(true)
        return
      }
      const id = extractYouTubeVideoId(url)
      if (id) {
        setVideoInfo({ id, title: tab.title || "Unknown Title" })
      }
    })
  }, [])

  const handleSave = () => {
    if (videoInfo) {
      saveVideoInfoToLocalStorage(videoInfo.id, videoInfo.title)
      setMessage("動画情報が保存されました！")
    }
  }

  const handleClear = () => {
    localStorage.clear()
    setMessage("この拡張機能に関する情報を削除しました")
  }

  const styles: Record<string, React.CSSProperties> = {
    container: {
      display: "flex",
      flexDirection: videoInfo ? "row" : "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      width: videoInfo ? "450px" : "300px",
      height: videoInfo ? "auto" : "100px",
      boxSizing: "border-box"
    },
    content: {
      flex: 1
    },
    error: {
      textAlign: "center",
      color: "var(--color_red)",
      fontWeight: "bold",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "16px"
    },
    button: {
      padding: "0.5rem 1rem",
      backgroundColor: "var(--color_green)",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    },
    deleteButton: {
      padding: "0.5rem 1rem",
      backgroundColor: "var(--color_red)",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "1rem"
    }
  }

  return (
    <div style={styles.container}>
      {isNewTabPage ? (
        <div style={styles.content}>
          <button onClick={handleClear} style={styles.deleteButton}>
            この拡張子に関する情報を削除
          </button>
          <p>{message}</p>
        </div>
      ) : videoInfo ? (
        <div style={styles.content}>
          <p>
            <strong>ID:</strong> {videoInfo.id}
          </p>
          <p>
            <strong>タイトル:</strong> {videoInfo.title}
          </p>
          <button onClick={handleSave} style={styles.button}>
            保存
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div style={styles.error}>このサイトでは使えません</div>
      )}
    </div>
  )
}

export default IndexPopup
