# 正航考勤戰情中心 (ChiHrApp) v2

這是一個基於 React 的考勤戰情中心應用程式，用於可視化和管理員工的出勤、稼動率及戰力分析。

## 技術棧

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **UI Framework**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Language**: TypeScript

## 專案設置

### 前置需求
- Node.js (v18+)
- npm

### 安裝依賴

```bash
npm install
```

### 開發模式

啟動本地開發伺服器：

```bash
npm run dev
```

### 建置與部署

建置生產版本：

```bash
npm run build
```

預覽生產版本：

```bash
npm run preview
```

### 程式碼檢查

執行 ESLint檢查：

```bash
npm run lint
```

## 部署流程 (CI/CD)

本專案配置了 GitHub Actions 自動化部署流程，當推送到 `master` 或 `main` 分支時，會自動執行建置並部署至 GitHub Pages。

**注意**：請確保 GitHub Repository 的 Settings > Pages 中，Source 設定為 "GitHub Actions"。

## 目錄結構

- `src/` (如果有): 原始碼
- `components/`: UI 元件
- `types.ts`: TypeScript 類型定義
- `App.tsx`: 主應用程式入口
- `public/`: 靜態資源

## 貢獻指南

1.  Fork 本專案
2.  建立 Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit 更改 (`git commit -m 'Add some AmazingFeature'`)
4.  Push 到 Branch (`git push origin feature/AmazingFeature`)
5.  開啟 Pull Request
