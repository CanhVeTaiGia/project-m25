interface AdminHeaderUserProps {
  handleShowAddUser: () => void;
}
export const AdminHeaderUser: React.FC<AdminHeaderUserProps> = ({
  handleShowAddUser,
}) => {
  // const handleShowAddForm = () => {
  //   setShowAddForm(true);
  // };
  return (
    <header className="w-[100%] px-[20px] items-center h-[100px] text-black flex bg-[#ffffff]">
      <h2 className="text-[28px] pl-[20px]">Người Dùng</h2>
      <select className="ml-[120px] py-[5px] border-[1px] rounded-[5px] px-[10px]">
        <option value="">Không sắp xếp</option>
        <option value="asc">Từ A-Z</option>
        <option value="desc">Từ Z-A</option>
      </select>
      <button
        onClick={handleShowAddUser}
        className="ml-[500px] rounded-[5px] text-white bg-[#08f] p-[10px]"
      >
        Thêm Người Dùng
      </button>
    </header>
  );
};

import React from "react";

interface AddAndEditCategoryProps {
  handleShowAddCategory: () => void;
  showAddAndEditCategory: {
    type: "add" | "edit" | "";
    isShowing: boolean;
    currentId: number | null | undefined;
  };
}
export const AdminHeaderCategory: React.FC<AddAndEditCategoryProps> = ({
  handleShowAddCategory,
  showAddAndEditCategory,
}) => {
  return (
    <header className="w-[100%] px-[20px] items-center h-[100px] text-black flex bg-[#ffffff]">
      <h2 className="text-[24px] pl-[20px]">Thêm Danh mục</h2>
      <button
        onClick={handleShowAddCategory}
        className="ml-[900px] rounded-[5px] text-white bg-[#08f] p-[10px]"
      >
        Thêm Danh Mục
      </button>
    </header>
  );
};
