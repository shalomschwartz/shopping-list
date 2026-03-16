import HusbandList from "@/components/HusbandList";

interface Props {
  params: { encoded: string };
}

export default function ListPage({ params }: Props) {
  let items: { name: string; imageUrl: string }[] = [];

  try {
    const json = decodeURIComponent(atob(params.encoded));
    items = JSON.parse(json);
  } catch {
    return (
      <main className="max-w-lg mx-auto px-4 py-10 text-center">
        <p className="text-red-500 text-lg">Invalid list link.</p>
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🛒 Your List</h1>
        <p className="text-gray-500 mt-1">Tap each item when you find it</p>
      </div>
      <HusbandList items={items} />
    </main>
  );
}
