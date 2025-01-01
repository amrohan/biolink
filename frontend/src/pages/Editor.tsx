import { Navbar } from "../components/Navbar";
import { MockMobile } from "../components/ui/MockMobile";
import UiBuilder from "../components/UiBuilder";


export function Editor() {
  return (
    <>
      <Navbar />
      <section className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
        <main className="flex flex-col md:flex-row mx-auto justify-between items-start gap-16 md:gap-20 w-full mt-8">
          <div className="w-full md:w-9/12">
            <UiBuilder />
          </div>

          <div className="w-full md:w-3/12">
            <MockMobile />
          </div>
        </main>
      </section>
    </>
  )

}

