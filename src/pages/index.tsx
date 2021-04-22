import Filter from "@components/Filter";
import Header from "@components/Header";
import SearchInput from "@components/SearchInput";

export default function Home() {
  return (
    <div>
      <Header isDark={false} />
      <div className="container px-4">
        <SearchInput />
        <Filter />
      </div>
    </div>
  );
}
