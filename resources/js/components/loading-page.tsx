import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="h-screen min-h-screen flex flex-col justify-center items-center">
      <Loader className="animate-spin size-10" />
      <p className="font-medium animate-pulse">Memuat...</p>
    </div>
  )
}

export default LoadingPage;