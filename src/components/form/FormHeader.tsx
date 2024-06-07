import TextBg from "../typography/TextBg";

interface IFormHeader {
  headerArr: string[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}
export default function FormHeader({
  headerArr,
  activeTab,
  setActiveTab,
}: IFormHeader) {
  function handleToggleActiveTab(tab: number) {
    setActiveTab(tab > 1 ? tab - 1 : tab);
  }

  return (
    <div>
      <TextBg
        className="!text-xl md:!text-4xl text-purple-200 !font-extrabold"
        content={headerArr[activeTab - 1]}
      />
      <div className="flex justify-start gap-3 items-center mt-4">
        {headerArr.map((_head, index) => (
          <div
            className={`${
              index + 1 <= activeTab ? "bg-purple-200" : "bg-[#D9D9D9]"
            } w-6 lg:w-8 h-1 cursor-pointer rounded-[0.125rem]`}
            key={index}
            onClick={() => handleToggleActiveTab(index+1)}
          ></div>
        ))}
      </div>
    </div>
  );
}
