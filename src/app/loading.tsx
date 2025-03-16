import Image from "next/image";
import style from "../components/search.module.css"
import reading from '../../public/reading.png'
export default function Loading() {
  // Stack uses React Suspense, which will render this page while user data is being fetched.
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
  return <div className="">
    <div className="flex justify-center items-center h-screen">
      <div className={`my-auto ${style.animate_float_delay}`}>
        <Image width={200} height={200} src={reading} alt="cartoon"></Image>
      </div>
    </div>
  </div>;
}
