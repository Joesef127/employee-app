import DefinitionSearch from "../components/DefinitionSearch";
import Definition from "./Definition";

export default function Dictionary() {
  return (
    <div className="flex justify-center items-center flex-col">
      <DefinitionSearch />
      <div className="my-4">
        {/* <Definition /> */}
      </div>
    </div>
  )
}
