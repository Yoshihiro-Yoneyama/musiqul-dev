import styles from './customers.module.css'

export default function Page() {
  return <main>
    <p>Customers Page</p>
    <div className={styles.button}>aaaaaaa</div>
    <div className={styles.button}>bbbbbbb</div>
  </main>;
}

type t = {
  foo: string;
  bar: number;
  buzz: boolean;
}