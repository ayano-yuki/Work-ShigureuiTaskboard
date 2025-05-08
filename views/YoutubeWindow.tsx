import React, { useEffect, useState } from "react";
import BaseWindow from "~/components/BaseWindow";
import "~/main.css";

type Props = {
  onClose: () => void;
  zIndex: number;
};

type VideoInfo = [string, string]; // [videoId, title]

const DEFAULT_VIDEO: VideoInfo = ["uCuSX3Y004E", "デフォルト"];

function YoutubeWindow({ onClose, zIndex }: Props) {
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string>(DEFAULT_VIDEO[0]);
  const [mode, setMode] = useState<"view" | "manage">("view");

  // 初期ロード: localStorage から動画リストを読み込む
  useEffect(() => {
    const saved = localStorage.getItem("youtubeVideos");
    if (saved) {
      const parsed: VideoInfo[] = JSON.parse(saved);
      if (parsed.length > 0) {
        setVideos(parsed);
        setSelectedVideoId(parsed[0][0]);
        return;
      }
    }
    setVideos([DEFAULT_VIDEO]);
    setSelectedVideoId(DEFAULT_VIDEO[0]);
  }, []);

  // 動画削除（インデックス指定で一つだけ削除）
  const handleDelete = (index: number) => {
    const updated = videos.filter((_, i) => i !== index);
    setVideos(updated);
    localStorage.setItem("youtubeVideos", JSON.stringify(updated));
    if (selectedVideoId === videos[index][0]) {
      setSelectedVideoId(updated[0]?.[0] || DEFAULT_VIDEO[0]);
    }
  };

  // モード切り替え
  const toggleMode = () => setMode((m) => (m === "view" ? "manage" : "view"));

  // レイアウト用スタイル
  const wrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "0.5rem",
    boxSizing: "border-box",
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  // スクロールエリアに右パディングを入れて、削除ボタンとスクロールバーが被らないように
  const scrollAreaStyle: React.CSSProperties = {
    position: "absolute",
    top: "20%",
    bottom: "1rem",
    left: "1rem",
    right: "1rem",
    paddingRight: "1rem",
    overflowY: "auto",
  };

  return (
    <BaseWindow
      title="Youtube"
      defaultPosition={{ x: 400, y: 100 }}
      defaultSize={{ width: 600, height: 450 }}
      onClose={onClose}
      zIndex={zIndex}
    >
      <div style={wrapperStyle}>
        {/* ヘッダー：モード切替ボタン ＋ 閲覧時はプルダウン */}
        <div style={headerStyle}>
          <button
            onClick={toggleMode}
            style={{
              border: "none",
              borderRadius: 6,
              color: "var(--color_white)",
              fontWeight: "bold",
              padding: "6px 12px",
              cursor: "pointer",
              marginRight: "0.5rem",
              backgroundColor: mode === "view" ? "var(--color_blue)" : "var(--color_red)",
            }}
          >
            {mode === "view" ? "管理モード" : "閲覧モード"}
          </button>
          {mode === "view" && (
            <select
              value={selectedVideoId}
              onChange={(e) => setSelectedVideoId(e.target.value)}
              style={{
                marginLeft: "1rem",
                padding: "0.5rem",
                width: "75%",
                boxSizing: "border-box",
              }}
            >
              {videos.map(([id, title], idx) => (
                <option key={`${id}-${idx}`} value={id}>
                  {title}
                </option>
              ))}
            </select>
          )}
        </div>

        {mode === "view" ? (
          /* 閲覧モード */
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideoId}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          /* 管理モード */
          <div style={scrollAreaStyle}>
            {videos.map(([id, title], idx) => (
              <div
                key={`${id}-${idx}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <span>{title}</span>
                <button
                  onClick={() => handleDelete(idx)}
                  style={{
                    width: 24,
                    height: 24,
                    flexShrink: 0,
                    borderRadius: 6,
                    border: "none",
                    backgroundColor: "var(--color_red)",
                    color: "var(--color_white)",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </BaseWindow>
  );
}

export default YoutubeWindow;
