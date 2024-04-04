import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  if (status == "loading") {
    return <div />;
  }
  if (status == "authenticated") {
    router.push("/dashboard");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Neo-Manager</title>
        <meta name="description" content="Generated by Neo Soft" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.leftChildContainer}>
        <div>Simple Task Manager</div>
        <p>
          <Link href="/register">
            <a>Register</a>
          </Link>
          {' '}to get started.{" "}
        </p>
      </div>
      <div className={styles.rightChildContainer}>
        <img src={"/Image/nicebg.svg"} />
      </div>
    </div>
  );
}
