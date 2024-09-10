"use client";
import { storage } from "@/config/firebase";
import { CategoryType } from "@/interface/categoryType";
import { ProductType } from "@/interface/productType";
import { RootType } from "@/redux/store";
import { getACategory, getCategory } from "@/services/category.service";
import {
  addProduct,
  getProduct,
  editTheProduct,
} from "@/services/product.service";
import { faImage, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AddOrEditProductProps {
  handleHideAddOrEditForm: () => void;
  showAddOrEditModal: {
    show: boolean;
    id: number | undefined;
    type: "add" | "edit";
  };
}
const AddOrEditProduct: React.FC<AddOrEditProductProps> = ({
  handleHideAddOrEditForm,
  showAddOrEditModal,
}) => {
  const dispatch = useDispatch();
  const { editProduct }: any = useSelector((state: RootType) => {
    return state.products;
  });
  const { category }: any = useSelector((state: RootType) => {
    return state.category;
  });

  const [product, setProduct] = useState<ProductType>({
    name: "",
    price: 0,
    image: "",
    categoryId: 0,
    stock: 0,
  });
  const [image, setImage] = useState<any>(() => {
    if (editProduct) {
      return {
        name: editProduct.name,
        url: editProduct.image,
        file: editProduct.image,
      };
    } else {
      return {
        file: null,
        name: null,
        url: "",
      };
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProduct({
      ...product,
      [name]: value,
      image: image.url,
      categoryId: name === "categoryId" ? Number(value) : product.categoryId,
      price: name === "price" ? Number(value) : product.price,
      stock: name === "stock" ? Number(value) : product.stock,
    });
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageRef = ref(storage, `products/${file.name}`);
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImage({
            file,
            name: file.name,
            url,
          });
          setProduct((prevImage) => ({
            ...prevImage,
            image: url,
          }));
        });
      });
    }
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(product);
    if (
      product.name &&
      product.price &&
      product.image &&
      product.categoryId &&
      product.stock
    ) {
      dispatch(addProduct(product));
      handleHideAddOrEditForm();
    }
  };
  const handleEditProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      product.name &&
      product.price &&
      product.image &&
      product.categoryId &&
      product.stock
    ) {
      console.log(product);

      dispatch(editTheProduct(product));
      handleHideAddOrEditForm();
    }
  };
  const hideModal = () => {};

  useEffect(() => {
    if (editProduct.id) {
      setProduct(editProduct);
    }
  }, [editProduct.id]);
  useEffect(() => {
    dispatch(getProduct(showAddOrEditModal.id));
  }, []);
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  return (
    <div className="w-[100%] h-[100vh] absolute bg-[#000000aa] flex justify-center items-center top-0 left-0">
      <form
        onSubmit={
          showAddOrEditModal.type === "add"
            ? handleAddProduct
            : handleEditProduct
        }
        className="w-[500px] rounded-[10px] p-[20px] bg-[#fff]"
      >
        <div className="flex justify-between">
          <h2 className="text-[24px]">
            {showAddOrEditModal.type === "add" ? "Thêm" : "Sửa"} sản phẩm
          </h2>
          <p
            onClick={handleHideAddOrEditForm}
            className="text[24px] cursor-pointer"
          >
            X
          </p>
        </div>
        <input
          onChange={handleChange}
          value={showAddOrEditModal.type === "add" ? undefined : product.name}
          className="border-[1px] rounded-[5px] mt-[10px] p-[5px] w-[100%] outline-none"
          type="text"
          name="name"
          placeholder="Nhập tên sản phẩm"
        />
        <select
          name="categoryId"
          onChange={handleChange}
          className="mt-[10px] w-[100%] p-[5px] rounded-[5px] border-[1px] outline-none"
        >
          {category.map((item: CategoryType) => (
            <option
              key={item.id}
              value={item.id}
              selected={item.id === showAddOrEditModal.id}
            >
              {item.name}
            </option>
          ))}
        </select>

        <input
          onChange={handleChange}
          value={
            showAddOrEditModal.type === "add"
              ? undefined
              : Number(product.price)
          }
          className="border-[1px] rounded-[5px] mt-[10px] p-[5px] w-[100%] outline-none"
          type="number"
          min={0}
          name="price"
          placeholder="Nhập giá"
        />
        <input
          onChange={handleChange}
          value={
            showAddOrEditModal.type === "add"
              ? undefined
              : Number(product.stock)
          }
          className="border-[1px] rounded-[5px] mt-[10px] p-[5px] w-[100%] outline-none"
          type="number"
          name="stock"
          placeholder="Nhập số lượng"
        />
        <div className="flex items-center gap-[10px] mt-[10px] flex-col">
          {product.image === "" ? (
            image.url === "" ? (
              <FontAwesomeIcon
                icon={faImage}
                className="size-[50px] rounded-[5px] border-[1px] p-[20px]"
              />
            ) : (
              <Image src={image.url} alt="" width={50} height={50} />
            )
          ) : (
            <Image src={product.image} alt="" width={50} height={50} />
          )}
          <label
            htmlFor="file"
            className="p-[5px] flex justify-center item-center cursor-pointer rounded-[5px] border-[1px]"
          >
            <FontAwesomeIcon className="size-[20px]" icon={faUpload} />
          </label>
        </div>

        <input
          // value={product.image ? product.image : ''}
          onChange={handleUploadImage}
          name="image"
          id="file"
          type="file"
          hidden
        />
        <div className="flex justify-center mt-[10px]">
          <button className="w-[80px] text-white py-[10px] rounded-[5px] bg-[#08f]">
            {showAddOrEditModal.type === "add" ? "Thêm" : "Sửa"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrEditProduct;
