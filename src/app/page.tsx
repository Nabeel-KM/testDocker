import type { Metadata } from 'next'
import MyBidsComp from '../../components/myBids';

export const metadata: Metadata = {
  title: "Property Search",
  description: "Learn how to navigate the competitive world of property bidding and increase your chances of securing your dream home or investment property.",
  icons: {
    icon: {
      url: "/logo.svg",
      type: "image/svg",
    },
    shortcut: { url: "/logo.svg", type: "image/svg" },
  },
};

export default function Home() {

  return (
    <MyBidsComp />
  )
}
