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

export function f(): any {
  const obj1: t = { foo: 'foo1', bar: 42, buzz: true };
  const { foo, bar } = obj1;
  console.log(foo)
  console.log(obj1.foo)
}