import { UserInfo } from "@/components/auth/UserInfo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">mindgames チケット販売</h1>
        <p className="mt-4 text-lg text-gray-600">
          イベントチケットの販売サイト
        </p>
      </div>

      <div className="mt-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Authentication Test
        </h2>
        <UserInfo />
      </div>
    </main>
  );
}
