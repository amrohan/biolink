import { MockMobile } from "../components/MockMobile";
import UiBuilder from "../components/UiBuilder";


export function Editor() {
  return (
    <>
      <section className="w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
        <main className="flex flex-col md:flex-row mx-auto justify-between items-start gap-16 md:gap-10 w-full mt-8">
          <UiBuilder />
          <MockMobile />
        </main>
      </section>
    </>
  )

}

