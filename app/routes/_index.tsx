import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="rounded-lg bg-gray-200 p-4">
      <p>Feito com <span className="text-red-500">&hearts;</span> por Você</p>
    </div>
  );
}
