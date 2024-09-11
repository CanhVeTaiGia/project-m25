'use client'

const Footer: React.FC = () => {
  return (
    <footer className="w-[100%] z-[20] block bg-[#fff] mt-[20px] px-[150px] py-[30px]">
      <div className="flex w-[100%] justify-around">
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[24px] font-[700]">Thông tin công ty</h2>
          <ul className="text-[16px] flex flex-col gap-[5px]">
            <li>Giới thiệu về công ty</li>
            <li>Góp ý, khiếu nại</li>
            <li>Tuyển dụng</li>
          </ul>
        </div>
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[24px] font-[700]">Chính sách</h2>
          <ul className="text-[16px] flex flex-col gap-[5px]">
            <li>Chính sách về chất lượng</li>
            <li>Chính sách về bảo hành - bảo trì</li>
            <li>Chính sách về bảo mật thông tin</li>
            <li>Chính sách về bảo mật vận chuyển</li>
            <li>Chính sách về bảo mật cách vệ sinh Laptop</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
