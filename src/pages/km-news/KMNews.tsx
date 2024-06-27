import BlogCard from '@components/Cards/BlogCard';
import AsideContentLayout from '@components/Layouts/AsideContentLayout';
import HomeLayout from '@components/Layouts/HomeLayout';
import NestedFolder, {
  NestedFolderItem,
} from '@components/NestedFolder/NestedFolder';
import { Grid, Stack } from '@mantine/core';
import { useMemo, useState } from 'react';

export default function KMNews() {
  const [activeCategory, setActiveCategory] = useState('1');
  console.log({ activeCategory });

  const data = useMemo(() => {
    return [
      {
        slug: 'introduction-to-knowledge-management',
        category: 'Knowledge Management',
        title: 'Introduction to Knowledge Management',
        content: `<h1 style="font-size: 28px; color: #333; margin-bottom: 20px;">Introduction to Knowledge Management</h1><p>Knowledge Management (KM) is a discipline that focuses on leveraging an organization's collective knowledge to achieve its goals effectively. In today's rapidly evolving digital landscape, the ability to manage and harness knowledge has become a critical factor in maintaining competitiveness and innovation.</p><h2 style="font-size: 24px; color: #333; margin-bottom: 15px;">Understanding Knowledge Management</h2><p>At its core, Knowledge Management involves capturing, organizing, sharing, and utilizing knowledge and information within an organization. This includes explicit knowledge (documented information, databases) and tacit knowledge (personal insights, expertise) possessed by individuals.</p><h3 style="font-size: 20px; color: #333; margin-bottom: 10px;">Key Components of Knowledge Management:</h3><ul style="margin-bottom: 15px;"> <li><strong>Knowledge Creation:</strong> The process of generating new knowledge through research, development, and innovation.</li> <li><strong>Knowledge Capture:</strong> Systematic gathering and documenting of knowledge from various sources within the organization.</li> <li><strong>Knowledge Sharing:</strong> Facilitating the exchange of knowledge among employees to enhance collaboration and decision-making.</li> <li><strong>Knowledge Storage:</strong> Effective management of repositories, databases, and platforms to store and retrieve knowledge assets.</li> <li><strong>Knowledge Application:</strong> Applying knowledge to solve problems, make decisions, and create value for the organization.</li></ul><h2 style="font-size: 24px; color: #333; margin-bottom: 15px;">Importance of Knowledge Management</h2><p>Implementing a robust Knowledge Management strategy offers several benefits:</p><ul style="margin-bottom: 15px;"> <li><strong>Enhanced Decision Making:</strong> Access to relevant and timely information improves decision-making processes across all levels of the organization.</li> <li><strong>Increased Innovation:</strong> Encourages creativity and innovation by leveraging existing knowledge and fostering a culture of continuous learning.</li> <li><strong>Improved Efficiency:</strong> Reduces redundancy, avoids reinventing the wheel, and promotes best practices within the organization.</li> <li><strong>Better Customer Service:</strong> Enables employees to access information quickly, leading to better customer responsiveness and satisfaction.</li></ul><h2 style="font-size: 24px; color: #333; margin-bottom: 15px;">Challenges in Knowledge Management</h2><p>Despite its benefits, KM faces challenges such as:</p><ul style="margin-bottom: 15px;"> <li><strong>Culture and Adoption:</strong> Resistance to change and lack of participation in knowledge-sharing initiatives.</li> <li><strong>Technology Integration:</strong> Ensuring seamless integration of KM tools and platforms with existing systems.</li> <li><strong>Knowledge Validation:</strong> Ensuring the accuracy and relevance of knowledge shared across the organization.</li></ul><h2 style="font-size: 24px; color: #333; margin-bottom: 15px;">Future Trends in Knowledge Management</h2><p>Looking ahead, the future of Knowledge Management is poised for exciting developments:</p><ul style="margin-bottom: 15px;"> <li><strong>Artificial Intelligence (AI):</strong> AI-powered analytics and knowledge extraction tools will enhance the efficiency of knowledge discovery and decision support.</li> <li><strong>Blockchain Technology:</strong> Securing and validating knowledge transactions and intellectual property rights.</li> <li><strong>Remote Workforce:</strong> Facilitating KM in distributed teams through virtual collaboration tools and platforms.</li></ul><h2 style="font-size: 24px; color: #333; margin-bottom: 15px;">Conclusion</h2><p>In conclusion, Knowledge Management is a strategic approach that empowers organizations to harness their intellectual capital effectively. By investing in KM practices, organizations can unlock new opportunities for growth, innovation, and competitive advantage in today's knowledge-driven economy.</p>`,
        createdAt: '2023-05-15T10:30:00Z',
        thumbnailUrl:
          'https://image.cnbcfm.com/api/v1/image/107032274-1647540069295-gettyimages-1084167640-2018_10_13-n1_office_0312.jpeg?v=1647540545',
      },
      {
        slug: 'knowledge-management-strategies',
        category: 'Knowledge Management',
        title: 'Effective Strategies for Knowledge Management',
        content:
          'Exploring proven strategies to enhance knowledge sharing and retention.',
        createdAt: '2023-06-02T14:15:00Z',
        thumbnailUrl:
          'https://images.inc.com/uploaded_files/image/1920x1080/getty_1084171152_400165.jpg',
      },
      {
        slug: 'tools-for-knowledge-management',
        category: 'Knowledge Management',
        title: 'Top Tools for Knowledge Management',
        content:
          'A review of essential tools that facilitate effective knowledge management.',
        createdAt: '2023-06-20T09:45:00Z',
        thumbnailUrl:
          'https://images.inc.com/uploaded_files/image/1920x1080/getty_1084171152_400165.jpg',
      },
      {
        slug: 'importance-of-knowledge-sharing',
        category: 'Knowledge Management',
        title: 'The Importance of Knowledge Sharing',
        content:
          'Why fostering a culture of knowledge sharing is crucial for organizational success.',
        createdAt: '2023-07-01T11:00:00Z',
        thumbnailUrl:
          'https://images.inc.com/uploaded_files/image/1920x1080/getty_1084171152_400165.jpg',
      },
      {
        slug: 'knowledge-management-best-practices',
        category: 'Knowledge Management',
        title: 'Best Practices in Knowledge Management',
        content:
          'Key practices to optimize knowledge management processes and outcomes.',
        createdAt: '2023-07-15T16:20:00Z',
        thumbnailUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3N7_J_xA2t6ClUygKAgGZmCpYUW4ugjRyIQ&s',
      },
      {
        slug: 'future-trends-in-knowledge-management',
        category: 'Knowledge Management',
        title: 'Future Trends in Knowledge Management',
        content:
          'Predicting upcoming trends that will shape the future of knowledge management.',
        createdAt: '2023-08-05T13:45:00Z',
        thumbnailUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAL7g5PUkbD7oeDQ92Qy2HoI2JIVJ-sDmTcQ&s',
      },
    ];
  }, []);

  const categories: NestedFolderItem[] = [
    {
      value: '1',
      title: 'Semua (6)',
    },
    {
      value: '2',
      title: 'Berita (6)',
      child: [{ value: '2.1', title: 'Kategori Berita 1' }],
    },
    {
      value: '3',
      title: 'Pemerintahan (0)',
      child: [
        {
          value: '3.1',
          title: 'Kategori Pemerintahan 1',
        },
        {
          value: '3.2',
          title: 'Kategori Pemerintahan 2',
          child: [
            {
              value: '3.2.1',
              title: 'Pemerintahan A',
            },
          ],
        },
      ],
    },
    {
      value: '4',
      title: 'Perekonomian Keuangan (0)',
      child: [
        {
          value: '4.1',
          title: 'Kategori Keuangan 1',
        },
      ],
    },
    {
      value: '5',
      title: 'Pembangungan (0)',
      child: [
        {
          value: '5.1',
          title: 'Kategori Pembangunan 1',
        },
      ],
    },
    {
      value: '6',
      title: 'Kesejahteraan Rakyat (0)',
      child: [
        {
          value: '6.1',
          title: 'Kategori Kesejahteraan Rakyat 1',
        },
      ],
    },
  ];

  return (
    <HomeLayout>
      <div className="flex flex-col gap-12">
        <Stack gap={24}>
          <h1 className="text-4xl font-bold">Berita KM BPSDM</h1>
          <p>
            Menampilkan{' '}
            <span className="font-bold text-primary-main">
              {data?.length || 0}
            </span>{' '}
            Berita
          </p>
        </Stack>

        <AsideContentLayout
          stickyAside={false}
          aside={
            <Stack className="rounded-md border p-4">
              <NestedFolder
                data={categories}
                value={activeCategory}
                onChange={setActiveCategory}
              />
            </Stack>
          }
        >
          <Grid gutter={24}>
            {data.map((blog) => (
              <Grid.Col span={4}>
                <BlogCard
                  key={blog.slug}
                  slug={blog.slug}
                  category={blog.category}
                  title={blog.title}
                  content={blog.content}
                  createdAt={blog.createdAt}
                  thumbnailUrl={blog.thumbnailUrl}
                />
              </Grid.Col>
            ))}
          </Grid>
        </AsideContentLayout>
      </div>
    </HomeLayout>
  );
}
