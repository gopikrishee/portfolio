import React, { useState, useMemo } from 'react';
import { Search, Calendar, ArrowRight, X } from 'lucide-react';

export default function BlogsApp() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Sample blog data
  const blogs = [
    {
      id: 1,
      title: 'The Art of Minimalist Design',
      excerpt: 'Exploring how less can truly be more in modern web design.',
      content: 'Minimalist design is a powerful philosophy that has transformed modern web design. By embracing simplicity, we create interfaces that are not only beautiful but also highly functional. In this comprehensive guide, we explore the core principles of minimalism and how to apply them effectively in your projects.\n\nMinimalism in design is about removing unnecessary elements while maintaining clarity and purpose. Every component, every color, and every space must serve a specific function. This approach leads to faster load times, improved accessibility, and a better user experience overall.\n\nKey principles include:\n\n• Embrace white space: Don\'t fill every pixel. Let your content breathe.\n• Limited color palette: Use 2-3 primary colors with strategic accents.\n• Typography matters: Strong typography can carry the entire design.\n• Purpose-driven elements: Every visual element must have a reason to exist.\n\nWhen implemented correctly, minimalist design creates an elegant, timeless aesthetic that appeals to users across demographics. It\'s not about having nothing; it\'s about having exactly what\'s needed—nothing more, nothing less.',
      author: 'Sarah Chen',
      date: '2024-04-15',
      tags: ['design', 'minimalism', 'web'],
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
      readTime: 5,
    },
    {
      id: 2,
      title: 'React Hooks: A Complete Guide',
      excerpt: 'Master the fundamentals of React Hooks and write cleaner component logic.',
      content: 'React Hooks have revolutionized how we write React components. Introduced in React 16.8, Hooks allow you to use state and other React features without writing class components. This guide will walk you through the most important hooks and how to use them effectively.\n\nHooks are JavaScript functions that let you "hook into" React features. They make your code more modular and reusable. The two most important hooks are useState and useEffect.\n\nuseState allows you to add state to functional components. Instead of managing state in a class component, you can now manage it directly in your function:\n\nconst [count, setCount] = useState(0);\n\nuseEffect lets you perform side effects in functional components. It replaces the lifecycle methods from class components:\n\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);\n\nOther essential hooks include:\n• useContext: Access context values\n• useReducer: Complex state logic\n• useCallback: Memoize callback functions\n• useMemo: Optimize performance\n• useRef: Access DOM directly\n\nMastering these hooks will make you a more effective React developer and lead to cleaner, more maintainable code.',
      author: 'Alex Rodriguez',
      date: '2024-04-12',
      tags: ['react', 'javascript', 'tutorial'],
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=600&h=400&fit=crop',
      readTime: 8,
    },
    {
      id: 3,
      title: 'The Future of AI and Creativity',
      excerpt: 'How artificial intelligence is reshaping creative industries.',
      content: 'Artificial Intelligence is no longer just a buzzword—it\'s actively reshaping creative industries across the globe. From graphic design to music composition, from copywriting to visual art, AI tools are becoming indispensable allies for creative professionals.\n\nThe integration of AI in creative workflows has democratized access to professional-grade tools. What once required years of training can now be assisted by intelligent algorithms that learn from vast datasets of human creativity.\n\nKey areas of transformation:\n\n• Visual Design: AI can generate mockups, suggest layouts, and optimize color schemes based on best practices.\n• Content Creation: AI writing assistants help brainstorm ideas, optimize copy, and maintain consistency in voice and tone.\n• Music Production: AI tools can generate backgrounds, suggest chord progressions, and assist in arrangement.\n• Animation: Tools are emerging that can assist in frame generation and motion prediction.\n\nHowever, this technological shift raises important questions about authenticity, creativity rights, and the role of human creativity in an AI-augmented world. The future of creativity likely isn\'t about humans versus AI, but rather about how humans and AI can collaborate to produce extraordinary work that neither could achieve alone.',
      author: 'Jordan Mitchell',
      date: '2024-04-10',
      tags: ['ai', 'creativity', 'technology'],
      image: 'https://images.unsplash.com/photo-1677442d019cecf8cd6b4d17a218616d0cd225b4?w=600&h=400&fit=crop',
      readTime: 6,
    },
    {
      id: 4,
      title: 'Building Scalable Node.js Applications',
      excerpt: 'Best practices for creating performant backend systems.',
      content: 'Node.js has become a favorite choice for building scalable backend systems. Its non-blocking, event-driven architecture makes it ideal for I/O-intensive applications. However, scaling Node.js applications requires careful planning and adherence to best practices.\n\nScalability in Node.js starts with understanding the event loop. Since Node.js runs on a single thread, blocking operations can bottleneck your entire application. Always use asynchronous operations and avoid synchronous calls in production code.\n\nEssential practices for scalable Node.js apps:\n\n• Use clustering: The cluster module allows you to spawn multiple processes.\n• Implement caching: Redis can dramatically improve performance.\n• Database optimization: Use connection pooling and optimize queries.\n• Load balancing: Distribute traffic across multiple instances.\n• Monitoring: Use tools like New Relic or DataDog to track performance.\n• Async/await patterns: Keep your code clean and maintainable.\n\nArchitectural considerations:\n\n• Microservices: Break large applications into smaller, independent services.\n• Message queues: Use RabbitMQ or Kafka for asynchronous processing.\n• CDN: Serve static assets from a content delivery network.\n• Database sharding: Distribute data across multiple databases.\n\nWith these practices in place, Node.js can handle thousands of concurrent connections, making it perfect for modern web applications.',
      author: 'Emma Watson',
      date: '2024-04-08',
      tags: ['nodejs', 'backend', 'javascript'],
      image: 'https://images.unsplash.com/photo-1517694712202-14819c9cb5a6?w=600&h=400&fit=crop',
      readTime: 10,
    },
    {
      id: 5,
      title: 'UI/UX Trends for 2024',
      excerpt: 'What\'s trending in user interface and experience design this year.',
      content: 'As we progress through 2024, several design trends have emerged that are shaping the way we build digital interfaces. Staying current with these trends helps ensure your applications feel modern and meet user expectations.\n\nMajor trends defining 2024:\n\n• Dark mode dominance: Users are embracing dark interfaces for better accessibility and reduced eye strain.\n• Micro-interactions: Subtle animations and feedback enhance user engagement without feeling intrusive.\n• AI-powered personalization: Interfaces that adapt to individual user behaviors and preferences.\n• Glassmorphism: Frosted glass effects add depth and visual hierarchy.\n• Bold typography: Large, expressive type is being used as a primary design element.\n• 3D elements: WebGL and Canvas are enabling richer 3D experiences.\n• Accessible by default: Inclusive design is no longer optional—it\'s expected.\n\nMobile-first design remains paramount, with responsive design now extending to large screens with creative layouts that take advantage of the extra space.\n\nThe psychology of design continues to influence trends. Users expect faster interactions, clearer feedback, and more intuitive navigation. Empty states are opportunities to delight users, not just placeholders for missing content.\n\nThe intersection of aesthetics and function defines modern design. The best interfaces balance visual appeal with usability, ensuring that beautiful design serves the user\'s needs.',
      author: 'Lisa Park',
      date: '2024-04-05',
      tags: ['design', 'ux', 'trends'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      readTime: 7,
    },
    {
      id: 6,
      title: 'Mastering CSS Grid Layout',
      excerpt: 'Learn advanced CSS Grid techniques for responsive web design.',
      content: 'CSS Grid is a powerful layout system that has fundamentally changed how we approach responsive web design. Unlike Flexbox, which is one-dimensional, Grid excels at two-dimensional layouts, making it perfect for complex page structures.\n\nBasic Grid Concepts:\n\n• Grid container: The element with display: grid\n• Grid items: Direct children of the grid container\n• Grid tracks: The columns and rows defined by grid-template-columns and grid-template-rows\n• Grid lines: The dividing lines between tracks\n• Grid cells: The space between four grid lines\n\nAdvanced techniques:\n\n• Auto-placement: Grid intelligently places items without explicit positioning.\n• Responsive grids: Use auto-fit and minmax() for fluid layouts.\n• Named grid lines: Give grid lines meaningful names for cleaner code.\n• Implicit vs explicit grids: Understand when grid creates implicit tracks.\n• Grid overlapping: Layer items for creative layouts.\n• Subgrid: Create grids within grid items that respect parent grid structure.\n\nPractical examples:\n\n• Masonry layouts: Create Pinterest-style grids with varying heights.\n• Card layouts: Organize content in elegant card-based designs.\n• Complex dashboards: Build sophisticated data visualization layouts.\n\nCSS Grid is widely supported in modern browsers, making it safe to use in production. Combined with Flexbox, it gives you the tools needed to create any layout you can imagine.',
      author: 'David Lee',
      date: '2024-04-01',
      tags: ['css', 'web', 'tutorial'],
      image: 'https://images.unsplash.com/photo-1633356915991-b40a95c79b6d?w=600&h=400&fit=crop',
      readTime: 9,
    },
  ];

  // Extract unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set();
    blogs.forEach(blog => blog.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, []);

  // Filter blogs based on selected tags and search query
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => blog.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [selectedTags, searchQuery]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff'}}>
      {/* Header */}
      <header style={{position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(55, 65, 81, 0.5)'}}>
        <div style={{maxWidth: '42rem', margin: '0 auto', padding: '1.5rem'}}>
          <div>
            <h1 style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#ffffff', letterSpacing: '-0.02em'}}>
              Blog <span style={{color: '#60a5fa'}}>Hub</span>
            </h1>
            <p style={{color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.25rem'}}>Discover stories and insights</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{maxWidth: '42rem', margin: '0 auto', padding: '2rem 1.5rem'}}>
        {/* Search Section */}
        <div style={{marginBottom: '1.5rem'}}>
          <div style={{position: 'relative'}}>
            <Search style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', width: '1.25rem', height: '1.25rem'}} />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{width: '100%', paddingLeft: '3rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', borderRadius: '9999px', border: '1px solid #374151', backgroundColor: '#111827', color: '#ffffff'}}
            />
          </div>
        </div>

        {/* Tags Filter - Concise */}
        <div style={{marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', transition: 'all 0.3s', backgroundColor: selectedTags.includes(tag) ? '#2563eb' : '#111827', color: selectedTags.includes(tag) ? '#ffffff' : '#a1a5b0', border: selectedTags.includes(tag) ? 'none' : '1px solid #374151', cursor: 'pointer'}}
            >
              {tag}
            </button>
          ))}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              style={{padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500', backgroundColor: '#111827', color: '#6b7280', border: '1px solid #374151', cursor: 'pointer'}}
            >
              Clear
            </button>
          )}
        </div>

        {/* Blog List */}
        {filteredBlogs.length > 0 ? (
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                style={{backgroundColor: '#111827', borderRadius: '0.75rem', border: '1px solid #374151', overflow: 'hidden', cursor: 'pointer', padding: '1rem', display: 'flex', gap: '1rem', transition: 'all 0.3s'}}
                onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#1f2937'; e.currentTarget.style.borderColor = '#2563eb'}}
                onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = '#111827'; e.currentTarget.style.borderColor = '#374151'}}
              >
                {/* Image */}
                <div style={{width: '8rem', height: '8rem', flexShrink: 0, borderRadius: '0.5rem', overflow: 'hidden', backgroundColor: '#1f2937'}}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s'}}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>

                {/* Content */}
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                  <div>
                    <h3 style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '0.25rem'}}>
                      {blog.title}
                    </h3>
                    <p style={{color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.75rem'}}>
                      {blog.tags.map(tag => (
                        <span
                          key={tag}
                          style={{padding: '0.125rem 0.5rem', backgroundColor: '#1f2937', color: '#a1a5b0', borderRadius: '9999px', fontSize: '0.75rem', textTransform: 'lowercase'}}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <span>{blog.author}</span>
                      <span>•</span>
                      <span>{blog.readTime} min</span>
                    </div>
                    <button style={{color: '#60a5fa', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>
                      Read <ArrowRight style={{width: '0.75rem', height: '0.75rem'}} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div style={{textAlign: 'center', padding: '3rem 0'}}>
            <div style={{display: 'inline-block', marginBottom: '1rem'}}>
              <Search style={{width: '2rem', height: '2rem', color: '#4b5563'}} />
            </div>
            <h3 style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '0.5rem'}}>No blogs found</h3>
            <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Try adjusting your search or filters</p>
          </div>
        )}

        {/* Results Count */}
        {filteredBlogs.length > 0 && (
          <div style={{marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#6b7280'}}>
            Showing {filteredBlogs.length} of {blogs.length} blog{blogs.length !== 1 ? 's' : ''}
          </div>
        )}
      </main>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div
          style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'}}
          onClick={() => setSelectedBlog(null)}
        >
          <div
            style={{backgroundColor: '#111827', borderRadius: '1rem', border: '1px solid #374151', maxWidth: '42rem', width: '100%', maxHeight: '90vh', overflowY: 'auto'}}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{position: 'sticky', top: 0, backgroundColor: '#111827', borderBottom: '1px solid #374151', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff', flex: 1, paddingRight: '1rem'}}>{selectedBlog.title}</h2>
              <button
                onClick={() => setSelectedBlog(null)}
                style={{color: '#9ca3af', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.5rem'}}
              >
                <X style={{width: '1.5rem', height: '1.5rem'}} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{padding: '1.5rem'}}>
              {/* Featured Image */}
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                style={{width: '100%', height: '20rem', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1.5rem'}}
              />

              {/* Meta Information */}
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #374151'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <Calendar style={{width: '1rem', height: '1rem'}} />
                  <span>
                    {new Date(selectedBlog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <span>•</span>
                <span>{selectedBlog.readTime} min read</span>
                <span>•</span>
                <span style={{fontWeight: '500', color: '#ffffff'}}>{selectedBlog.author}</span>
              </div>

              {/* Tags */}
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem'}}>
                {selectedBlog.tags.map(tag => (
                  <span
                    key={tag}
                    style={{padding: '0.5rem 0.75rem', backgroundColor: '#1f2937', color: '#a1a5b0', borderRadius: '9999px', fontSize: '0.75rem', textTransform: 'lowercase'}}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Blog Content */}
              <div style={{color: '#a1a5b0', lineHeight: '1.75rem'}}>
                {selectedBlog.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('•')) {
                    return (
                      <div key={idx} style={{marginBottom: '1rem'}}>
                        {paragraph.split('\n').map((line, lineIdx) => (
                          <div key={lineIdx} style={{display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', color: '#a1a5b0'}}>
                            <span style={{color: '#60a5fa', flexShrink: 0, marginTop: '0.25rem'}}>•</span>
                            <span>{line.replace('• ', '')}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <p key={idx} style={{marginBottom: '1rem', lineHeight: '1.75rem', color: '#a1a5b0'}}>
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Close Button */}
              <div style={{marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #374151'}}>
                <button
                  onClick={() => setSelectedBlog(null)}
                  style={{width: '100%', padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: '#ffffff', fontWeight: '500', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
