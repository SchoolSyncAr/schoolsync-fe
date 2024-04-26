import Footer from '../../components/Footer'
import Header from '../../components/Header'

interface PageProps {
  header?: React.ReactNode
  search?: React.ReactNode
  content: React.ReactNode
}

export const Page = ({ header, search, content }: PageProps) => {
  return (
    <div className={`main ${search ? 'main--search' : header ? 'main--header' : ''}`}>
      <Header />
      {search}
      {content}
      <Footer />
    </div>
  )
}
