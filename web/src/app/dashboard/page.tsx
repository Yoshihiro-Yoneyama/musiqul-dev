import styles from '../ui/home.module.css'
export default function Page() {
  return <main className="flex min-h-scren flex-col p-1">
    <p>Dashboard Page</p>
    <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">div1</div>
    <div
      className="h-0 w-0 border-b-[100px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent">div2
    </div>
    <div className={styles.shape} />
  </main>;
}