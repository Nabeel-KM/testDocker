"use client"
import './index.scss'
import Layout from '../../components/common/Layout';
import ProgressBar from '../../components/common/progressBar';
import ClickScrollToTop from '../../components/common/scrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProgressBar />
        <ClickScrollToTop />
        <ToastContainer theme='dark' />
              <Layout>
                {children}
              </Layout>
      </body>
    </html>
  )



}