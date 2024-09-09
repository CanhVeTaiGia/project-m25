"use client";
import AddAndEditCategory from "@/components/AddCategory";
import DeleteCategory from "@/components/DeleteCategory";
import { CategoryType } from "@/interface/categoryType";
import { AdminHeaderCategory } from "@/layouts/header/AdminHeader";
import { RootType } from "@/redux/store";
import { getCategory } from "@/services/category.service";
import {
  faBan,
  faCheck,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CategoryManager: React.FC = () => {
  const data: any = useSelector((state: RootType) => {
    return state.category;
  });
  const dispatch = useDispatch();
  const category = Array.isArray(data.category)
    ? data.category
    : [...data.category];

  const [showAddAndEditCategory, setShowAddAndEditCategory] = useState<{
    type: "add" | "edit" | "";
    isShowing: boolean;
    currentId: number | null | undefined;
  }>({
    type: "",
    isShowing: false,
    currentId: null,
  });
  const [showDeleteCategory, setShowDeleteCategory] = useState<{
    isShowing: boolean;
    currentId: number | null | undefined;
  }>({
    isShowing: false,
    currentId: null,
  });

  const handleShowEditForm = (id: number | undefined) => {
    setShowAddAndEditCategory({
      type: "edit",
      isShowing: true,
      currentId: id,
    });
  };

  const handleShowAddCategory = () => {
    setShowAddAndEditCategory({
      type: "add",
      isShowing: true,
      currentId: null,
    });
  };
  const handleHideDeleteForm = () => {
    setShowDeleteCategory({
      isShowing: false,
      currentId: null,
    });
  };
  const handleShowDeleteForm = (id: number | undefined | null) => {
    setShowDeleteCategory({
      isShowing: true,
      currentId: id,
    });
  };
  const handleHideCategory = () => {
    setShowAddAndEditCategory({
      type: "",
      isShowing: false,
      currentId: null,
    });
  };

  useEffect(() => {
    dispatch(getCategory());
  }, []);
  return (
    <>
      {(showAddAndEditCategory.isShowing ||
        showAddAndEditCategory.type === "add") && (
        <AddAndEditCategory
          addOrEditCategory={showAddAndEditCategory}
          handleHideCategory={handleHideCategory}
        />
      )}

      {showDeleteCategory.isShowing && (
        <DeleteCategory
          hideForm={handleHideDeleteForm}
          id={showDeleteCategory.currentId}
        />
      )}
      <AdminHeaderCategory handleShowAddCategory={handleShowAddCategory} showAddAndEditCategory={showAddAndEditCategory}/>
      <>
        <div className="w-[100%] h-[100%] p-[20px] bg-[#ddd] ">
          <div className=" w-[100%] rounded-[5px] bg-[#fff] p-[20px]">
            <table className="w-[100%] bg-[#fff]">
              <thead className=" border-b-[1px]">
                <tr className="">
                  <th className="text-start pl-[10px] pb-[10px]">Tên</th>
                  <th className="text-start pl-[10px] pb-[10px]">Mô tả</th>
                  <th className="text-center pl-[10px] pb-[10px]">
                    Trạng thái
                  </th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {category.map((item: CategoryType) => (
                  <tr
                    key={item.id}
                    className="w-[100%] bg-[#fff] rounded-[5px]"
                  >
                    <td className="pl-[10px] py-[10px] text-start">
                      {item.name}
                    </td>
                    <td className="pl-[10px] text-start">
                      {item.description.split(" ").slice(0, 15).join(" ")}
                    </td>
                    <td className="pl-[10px] text-center">
                      {item.status ? (
                        <FontAwesomeIcon
                          className="text-[#0f0] border-[2px] p-[5px] size-[24px] rounded-[50%] border-[#0f0]"
                          icon={faCheck}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="text-[red] p-[5px] size-[24px]"
                          icon={faBan}
                        />
                      )}
                    </td>
                    <td className="text-center">
                      <FontAwesomeIcon
                        onClick={() => handleShowEditForm(item.id)}
                        className="text-[24px] text-[orange] cursor-pointer"
                        icon={faPen}
                      />
                      <FontAwesomeIcon
                        onClick={() => handleShowDeleteForm(item.id)}
                        className="ml-[20px] text-[#f00] text-[24px] cursor-pointer"
                        icon={faTrash}
                      ></FontAwesomeIcon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </>
  );
};

export default CategoryManager;
