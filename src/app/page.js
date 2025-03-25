import {
  EllipsisIcon,
  EllipsisVerticalIcon,
  HeartIcon,
  MessageCircleIcon,
} from "lucide-react";

export default function Page() {
  return (
    <div>
      {/*  */}
      <div className="mt-4 px-4">
        <div className="aspect-video rounded-lg bg-zinc-100 dark:bg-zinc-900"></div>
      </div>
      {/*  */}
      <div className="mt-4 px-4">
        <div className="flex items-baseline justify-between">
          <p className="text-lg font-semibold">เธรดยอดนิยม</p>
          <p className="text-sm opacity-50">เพิ่มเติม</p>
        </div>
        <div className="mt-2 flex gap-4 overflow-auto">
          <article className="min-w-40">
            <div className="aspect-[3/4] rounded-lg bg-zinc-100 dark:bg-zinc-900"></div>
            <p className="mt-2 line-clamp-2">
              ย่อหน้าต่าง อิกัวนาพาเหรด พุทโธเซอร์วิสแบล็กเทคโนแครต
              มินท์ลีเมอร์ฮิปฮอป รีวิวพงษ์ สตรอเบอร์รีเป่ายิงฉุบภูมิทัศน์
            </p>
            <p className="text-sm opacity-50">2 วันที่ผ่านมา</p>
          </article>
          <article className="min-w-40">
            <div className="aspect-[3/4] rounded-lg bg-zinc-100 dark:bg-zinc-900"></div>
            <p className="mt-2 line-clamp-2">
              ย่อหน้าต่าง อิกัวนาพาเหรด พุทโธเซอร์วิสแบล็กเทคโนแครต
              มินท์ลีเมอร์ฮิปฮอป รีวิวพงษ์ สตรอเบอร์รีเป่ายิงฉุบภูมิทัศน์
            </p>
            <p className="text-sm opacity-50">2 วันที่ผ่านมา</p>
          </article>
          <article className="min-w-40">
            <div className="aspect-[3/4] rounded-lg bg-zinc-100 dark:bg-zinc-900"></div>
            <p className="mt-2 line-clamp-2">
              ย่อหน้าต่าง อิกัวนาพาเหรด พุทโธเซอร์วิสแบล็กเทคโนแครต
              มินท์ลีเมอร์ฮิปฮอป รีวิวพงษ์ สตรอเบอร์รีเป่ายิงฉุบภูมิทัศน์
            </p>
            <p className="text-sm opacity-50">2 วันที่ผ่านมา</p>
          </article>
          <article className="min-w-40">
            <div className="aspect-[3/4] rounded-lg bg-zinc-100 dark:bg-zinc-900"></div>
            <p className="mt-2 line-clamp-2">
              ย่อหน้าต่าง อิกัวนาพาเหรด พุทโธเซอร์วิสแบล็กเทคโนแครต
              มินท์ลีเมอร์ฮิปฮอป รีวิวพงษ์ สตรอเบอร์รีเป่ายิงฉุบภูมิทัศน์
            </p>
            <p className="text-sm opacity-50">2 วันที่ผ่านมา</p>
          </article>
          <article className="min-w-40">
            <div className="aspect-[3/4] rounded-lg bg-zinc-100 dark:bg-zinc-900"></div>
            <p className="mt-2 line-clamp-2">
              ย่อหน้าต่าง อิกัวนาพาเหรด พุทโธเซอร์วิสแบล็กเทคโนแครต
              มินท์ลีเมอร์ฮิปฮอป รีวิวพงษ์ สตรอเบอร์รีเป่ายิงฉุบภูมิทัศน์
            </p>
            <p className="text-sm opacity-50">2 วันที่ผ่านมา</p>
          </article>
        </div>
      </div>
      {/*  */}
      <div className="mt-4 grid gap-6 px-4">
        <Artwork />
        <Artwork />
      </div>
      {/*  */}
      <div className="mb-40"></div>
    </div>
  );
}

function Artwork() {
  return (
    <article className="rounded-lg border p-4 delay-100 duration-200 hover:bg-zinc-100 focus-visible:bg-zinc-100 dark:hover:bg-zinc-900 dark:focus-visible:bg-zinc-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="aspect-square w-11 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
          <div>
            <p className="uppercase">username</p>
            <p className="text-sm opacity-50">2 วันที่ผ่านมา</p>
          </div>
        </div>
        <button>
          <EllipsisIcon />
        </button>
      </div>
      <div className="mt-4">
        <p>
          ย่อหน้าต่าง อิกัวนาพาเหรด พุทโธเซอร์วิสแบล็กเทคโนแครต
          มินท์ลีเมอร์ฮิปฮอป รีวิวพงษ์ สตรอเบอร์รีเป่ายิงฉุบภูมิทัศน์
        </p>
      </div>
      <div className="mt-4 aspect-[4/3] rounded-lg bg-zinc-200 dark:bg-zinc-800"></div>
      <div className="mt-4 flex gap-4">
        <button className="flex flex-1 justify-center gap-4 rounded-lg bg-zinc-200 p-3 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50 dark:bg-zinc-800">
          <HeartIcon />
          <p>0</p>
        </button>
        <button className="rounded-lg bg-zinc-200 p-3 duration-100 hover:opacity-75 focus-visible:opacity-75 active:opacity-50 dark:bg-zinc-800">
          <MessageCircleIcon />
        </button>
      </div>
    </article>
  );
}
