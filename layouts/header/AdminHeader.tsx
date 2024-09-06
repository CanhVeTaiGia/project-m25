interface AdminHeaderUserProps {
  setShowAddForm: any;
}
export const AdminHeaderUser: React.FC = ({}) => {
  // const pathName =
  // const handleShowAddForm = () => {
  //   setShowAddForm(true);
  // };
  return (
    <header className="w-[100%] px-[20px] items-center h-[100px] text-black flex bg-[#ffffff]">
      <h2 className="text-[28px] pl-[20px]">Người Dùng</h2>
      <select className="ml-[120px] border-[1px] rounded-[5px] px-[10px]">
        <option value="">Không sắp xếp</option>
        <option value="asc">Từ A-Z</option>
        <option value="desc">Từ Z-A</option>
      </select>
      <button className="ml-[500px] rounded-[5px] text-white bg-[#08f] p-[5px]">
        Thêm Người Dùng
      </button>
    </header>
  );
};
