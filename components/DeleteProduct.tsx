import { deleteProduct } from "@/services/product.service";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

interface DeleteProductProps {
  showDeleteModal: {
    show: boolean;
    id: number | undefined;
  };
  handleHideDeleteForm: () => void;
}
const DeleteProduct: React.FC<DeleteProductProps> = ({
  handleHideDeleteForm,
  showDeleteModal,
}) => {
  const dispatch = useDispatch();

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(showDeleteModal.id));
    handleHideDeleteForm();
  };
  return (
    <div className="absolute w-[100%] flex justify-center bg-[#000000aa] items-center h-[100vh] top-0 left-0">
      <div className="w-[500px] p-[20px] bg-white rounded-[10px]">
        <h2 className="text-[20px] text-center">
          Bạn có chắc muốn xóa sản phẩm này?
        </h2>
        <div className="flex justify-center gap-[20px] mt-[20px]">
          <button
            onClick={handleDeleteProduct}
            className="w-[80px] py-[10px] rounded-[5px] bg-[#4f4]"
          >
            Có
          </button>
          <button
            onClick={handleHideDeleteForm}
            className="w-[80px] rounded-[5px] py-[10px] bg-[#f00]"
          >
            Không
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
