
export default function page() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          This is a login page!
          <form action="" method="POST">

            <div id="login">

                <p><input type="text" placeholder="Username" name="username" required></input></p>
                <p><input type="password" placeholder="Password" name="password" required></input></p>

                <button type="submit">Login</button>
            </div>
          </form>
        </main>
      </div>
    )
}