import { WPSite } from "@/types/wpsite"

export default function PatternWPCard({ wpSite}: { wpSite: WPSite }) {
  return (
    <div className="text-sm mb-3 border cursor-pointer py-2 px-4 gap-3 rounded-xl hover:bg-secondary">{wpSite.url}</div>
  )
}
