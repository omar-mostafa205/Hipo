/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { wixClientServer } from "@/lib/wixClientServer";
import type { collections} from "@wix/stores";
import Image from "next/image";
import Link from "next/link";

const CategoryList = async ({categoryId }: {categoryId: string}) => {
  try {
    const wixServer = await wixClientServer();
    const { items } = await wixServer.collections.queryCollections().find();

    return (
      <div className="px-4 overflow-x-scroll scrollbar-hide">
        <div className="flex gap-4 md:gap-8">
          {items.map((item: collections.Collection) => (
            <Link
            href={`/list?cat=${item._id}&name=${item.name}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/4"
              key={item._id}
          >
              <div className="relative bg-slate-100 w-full h-100">
                <Image
                  src={item.media?.mainMedia?.image?.url || "/cat.png"}
                  alt={item.name || "Category"}
                  fill
                  sizes="30vw"
                  className="object-contain"
                />
              </div>
              <h1 className="mt-8 font-light text-xl tracking-wide text-black">
                {item.name || "Category"}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
    return <div>Failed to load categories.</div>;
  }
};

export default CategoryList;
