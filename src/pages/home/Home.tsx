import BlogCard from '@components/Cards/BlogCard';
import HomeLayout from '@components/Layouts/HomeLayout';
import ProfilePicture from '@components/ProfilePicture';
import { Grid, Group, Stack } from '@mantine/core';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

interface HighlightBlogProps {
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}
function HighlightBlog({
  slug,
  title,
  description,
  thumbnailUrl,
}: HighlightBlogProps) {
  return (
    <a
      href={`/km-news/${slug}`}
      className="relative flex h-[480px] items-end rounded-md"
    >
      <img
        alt="highlight"
        src={thumbnailUrl}
        className="absolute z-[1] h-[480px] w-full rounded-md object-cover"
      />
      <div className="z-[2] flex w-full flex-col gap-2 rounded-b-md bg-base-black/60 p-6 text-base-white">
        <h3 className="line-clamp-1 break-all text-2xl font-semibold">
          {title}
        </h3>
        <p className="line-clamp-1 break-all text-sm">
          {description}
        </p>
      </div>
    </a>
  );
}

interface ProgramItemProps {
  title: string;
  imageUrl?: string;
}
function ProgramItem({ title, imageUrl }: ProgramItemProps) {
  return (
    <Stack align="center">
      <ProfilePicture
        alt="title"
        imageUrl={imageUrl}
        name={title}
        size={200}
      />
      <p className="font-bold">{title}</p>
    </Stack>
  );
}

export default function Home() {
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

  const gridSpan = useMemo(() => {
    if (data.length === 1) return 12;
    if (data.length === 2) return 6;
    return 4;
  }, [data]);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-12">
        <img
          alt="hero-banner"
          src="/HomeHeroBanner.png"
          className="rounded-md border"
        />

        <HighlightBlog
          slug="slug-here"
          title="Knowledge Management Session - Ruth Naibaho"
          description="Selamat datang di session knowledge management bersama BPSDM Prov DKI Jakarta. Kali ini kita kedatangan ibu Ruth Naibaho sekretaris kelurahan pengadengan"
          thumbnailUrl="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
        />

        <section className="flex flex-col gap-6">
          <Grid gutter={24}>
            {data.map((blog) => (
              <Grid.Col span={gridSpan}>
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

          <Link
            to="/km-news"
            className="text-center text-primary-main"
          >
            Lihat Semua
          </Link>
        </section>

        <section className="mt-[72px] flex flex-col gap-[72px]">
          <h2 className="text-center text-2xl font-bold">
            Program Knowledge Sharing
          </h2>
          <Group justify="space-evenly">
            <ProgramItem title="Podcast Rabu Belajar" />
            <ProgramItem title="Kopi Sedap BPKD" />
            <ProgramItem title="Webinar Series" />
          </Group>
        </section>
      </div>
    </HomeLayout>
  );
}
