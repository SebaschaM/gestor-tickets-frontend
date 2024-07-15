import { tailChase } from "ldrs";

tailChase.register();

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#070f26] flex-col gap-y-10">
      <img
        src="https://res.cloudinary.com/dvzjgzqbn/image/upload/v1720917548/svsegxphlutmgrrsh0ax.png"
        alt="Logo"
        className="w-auto h-40"
      />
      <l-tail-chase size="50" speed="2.3" color="white"></l-tail-chase>
    </div>
  );
};

export default Loader;
