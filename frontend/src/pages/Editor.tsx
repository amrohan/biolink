import { Navbar } from "../components/Navbar";
import { MockMobile } from "../components/ui/MockMobile";
import { UiBuilder } from "../components/UiBuilder";


export function Editor() {
    return (
        <>
            <Navbar />
            <section className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
                <main className="flex justify-between items-start gap-2 w-full mt-4">
                    <div className="w-9/12">
                        <UiBuilder />
                    </div>

                    <div className="w-3/12">
                        <MockMobile />
                    </div>
                </main>
            </section>
        </>
    )

}

