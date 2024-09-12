import { getAllUser } from "@/services/user.service";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface AdminHeaderUserProps {
  handleShowAddUser: () => void;
}
export const AdminHeaderUser: React.FC<AdminHeaderUserProps> = ({
  handleShowAddUser,
}) => {
  const dispatch = useDispatch();

  const handleSortUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;

    dispatch(getAllUser({ sort: value }));
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    dispatch(getAllUser({ sort: undefined, search: value }));
  };
  return (
    <header className="w-[100%] px-[20px] items-center h-[100px] text-black flex bg-[#ffffff]">
      <h2 className="text-[28px] pl-[20px]">Người Dùng</h2>
      <select
        onChange={handleSortUser}
        className="ml-[120px] py-[5px] border-[1px] rounded-[5px] px-[10px]"
      >
        <option value="">Không sắp xếp</option>
        <option value="asc">Từ A-Z</option>
        <option value="desc">Từ Z-A</option>
      </select>
      <input
        onChange={handleSearch}
        type="text"
        className="w-[300px] rounded-[5px] outline-none ml-[120px] border-[1px] py-[5px] px-[10px]"
      />

      <button
        onClick={handleShowAddUser}
        className="ml-[180px] rounded-[5px] text-white bg-[#08f] p-[10px]"
      >
        Thêm Người Dùng
      </button>
    </header>
  );
};

interface AddAndEditCategoryProps {
  handleShowAddCategory: () => void;
}
export const AdminHeaderCategory: React.FC<AddAndEditCategoryProps> = ({
  handleShowAddCategory,
}) => {
  return (
    <header className="w-[100%] px-[20px] items-center h-[100px] text-black flex bg-[#ffffff]">
      <h2 className="text-[24px] pl-[20px]">Danh mục</h2>
      <button
        onClick={handleShowAddCategory}
        className="ml-[900px] rounded-[5px] text-white bg-[#08f] p-[10px]"
      >
        Thêm Danh Mục
      </button>
    </header>
  );
};

interface AdminHeaderProductProps {
  showAddAndEditModal: {
    show: boolean;
    id: number | undefined;
    type: "add" | "edit";
  };
  handleShowAddOrEditForm: (type: "add" | "edit") => void;
}
export const AdminHeaderProduct: React.FC<AdminHeaderProductProps> = ({
  showAddAndEditModal,
  handleShowAddOrEditForm,
}) => {
  return (
    <>
      <header className="w-[100%] px-[20px] items-center h-[100px] py-[20px] text-black flex bg-[#ffffff]">
        <h2 className="text-[24px] pl-[20px]">Sản phẩm</h2>
        <button
          onClick={() => handleShowAddOrEditForm("add")}
          className="ml-[900px] rounded-[5px] text-white bg-[#08f] p-[10px]"
        >
          Thêm Sản phẩm
        </button>
      </header>
    </>
  );
};
