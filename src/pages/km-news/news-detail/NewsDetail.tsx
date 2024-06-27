import HomeLayout from '@components/Layouts/HomeLayout';
import SimpleBreadcrumbs, {
  Crumb,
} from '@components/SimpleBreadcrumbs';
import { Stack } from '@mantine/core';
import getPathWithSearchParams from '@utils/getPathWithSearchParams';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';

export default function NewsDetail() {
  const { slug } = useParams();
  const data = {
    slug: 'introduction-to-knowledge-management',
    category: 'Knowledge Management',
    title: 'Introduction to Knowledge Management',
    content: `<h1 style="font-size: 28px; color: #333; margin-bottom: 20px;">Introduction to Knowledge Management</h1><p>Knowledge Management (KM) is a discipline that focuses on leveraging an organization's collective knowledge to achieve its goals effectively. In today's rapidly evolving digital landscape, the ability to manage and harness knowledge has become a critical factor in maintaining competitiveness and innovation.</p><h2 style="font-size: 24px; color: #333; margin-bottom: 15px;">Understanding Knowledge Management</h2><p>At its core, Knowledge Management involves capturing, organizing, sharing, and utilizing knowledge and information within an organization. This includes explicit knowledge (documented information, databases) and tacit knowledge (personal insights, expertise) possessed by individuals.</p><h3 style="font-size: 20px; color: #333; margin-bottom: 10px;">Key Components of Knowledge Management:</h3><ul style="margin-bottom: 15px;"> <li><strong>Knowledge Creation:</strong> The process of generating new knowledge through research, development, and innovation.</li> <li><strong>Knowledge Capture:</strong> Systematic gathering and documenting of knowledge from various sources within the organization.</li> <li><strong>Knowledge Sharing:</strong> Facilitating the exchange of knowledge among employees to enhance collaboration and decision-making.</li> <li><strong>Knowledge Storage:</strong> Effective management of repositories, databases, and platforms to store and retrieve knowledge assets.</li> <li><strong>Knowledge Application:</strong> Applying knowledge to solve problems, make decisions, and create value for the organization.</li></ul><h2 style="font-size: 24px; color: #333; margin-bottom: 15px;">Importance of Knowledge Management</h2><p>Implementing a robust Knowledge Management strategy offers several benefits:</p><ul style="margin-bottom: 15px;"> <li><strong>Enhanced Decision Making:</strong> Access to relevant and timely information improves decision-making processes across all levels of the organization.</li> <li><strong>Increased Innovation:</strong> Encourages creativity and innovation by leveraging existing knowledge and fostering a culture of continuous learning.</li> <li><strong>Improved Efficiency:</strong> Reduces redundancy, avoids reinventing the wheel, and promotes best practices within the organization.</li> <li><strong>Better Customer Service:</strong> Enables employees to access information quickly, leading to better customer responsiveness and satisfaction.</li></ul><h2 style="font-size: 24px; color: #333; margin-bottom: 15px;">Challenges in Knowledge Management</h2><p>Despite its benefits, KM faces challenges such as:</p><ul style="margin-bottom: 15px;"> <li><strong>Culture and Adoption:</strong> Resistance to change and lack of participation in knowledge-sharing initiatives.</li> <li><strong>Technology Integration:</strong> Ensuring seamless integration of KM tools and platforms with existing systems.</li> <li><strong>Knowledge Validation:</strong> Ensuring the accuracy and relevance of knowledge shared across the organization.</li></ul><h2 style="font-size: 24px; color: #333; margin-bottom: 15px;">Future Trends in Knowledge Management</h2><p>Looking ahead, the future of Knowledge Management is poised for exciting developments:</p><ul style="margin-bottom: 15px;"> <li><strong>Artificial Intelligence (AI):</strong> AI-powered analytics and knowledge extraction tools will enhance the efficiency of knowledge discovery and decision support.</li> <li><strong>Blockchain Technology:</strong> Securing and validating knowledge transactions and intellectual property rights.</li> <li><strong>Remote Workforce:</strong> Facilitating KM in distributed teams through virtual collaboration tools and platforms.</li></ul><h2 style="font-size: 24px; color: #333; margin-bottom: 15px;">Conclusion</h2><p>In conclusion, Knowledge Management is a strategic approach that empowers organizations to harness their intellectual capital effectively. By investing in KM practices, organizations can unlock new opportunities for growth, innovation, and competitive advantage in today's knowledge-driven economy.</p>`,
    createdAt: '2023-05-15T10:30:00Z',
    thumbnailUrl:
      'https://image.cnbcfm.com/api/v1/image/107032274-1647540069295-gettyimages-1084167640-2018_10_13-n1_office_0312.jpeg?v=1647540545',
  };

  const crumbs: Crumb[] = [
    {
      title: 'Berita KM BPSDM',
      href: '/km-news',
    },
    {
      title: data?.title || '...',
      href: getPathWithSearchParams(),
    },
  ];

  return (
    <HomeLayout>
      <SimpleBreadcrumbs crumbs={crumbs} />
      <Stack gap={24} px={120} py={72}>
        <h2 className="font-bold uppercase text-primary-main">
          {data?.category}
        </h2>
        <h1 className="text-2xl font-bold">{data?.title}</h1>
        <img
          alt={`thumb-${slug}`}
          src={data?.thumbnailUrl}
          className="z-[2] h-[545px] w-full object-cover"
          loading="lazy"
        />
        {parse(data?.content || '')}
      </Stack>
    </HomeLayout>
  );
}
