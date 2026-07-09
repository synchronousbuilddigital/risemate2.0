"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const WysiwygEditor = ({ value, onChange }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    const formatDoc = (cmd, val = null) => {
        document.execCommand(cmd, false, val);
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
            editorRef.current.focus();
        }
    };

    return (
        <div className="space-y-2 relative">
            <style dangerouslySetInnerHTML={{__html: `
                div[contenteditable="true"] h2 { font-size: 1.5em; font-weight: 800; margin-bottom: 0.5em; margin-top: 1em; color: white; }
                div[contenteditable="true"] h3 { font-size: 1.25em; font-weight: 700; margin-bottom: 0.5em; margin-top: 1em; color: white; }
                div[contenteditable="true"] p { margin-bottom: 1em; }
                div[contenteditable="true"] ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1em; }
                div[contenteditable="true"] a { color: #C9A84C; text-decoration: underline; }
                div[contenteditable="true"] blockquote { border-left: 3px solid #C9A84C; padding-left: 1em; margin-left: 0; font-style: italic; color: rgba(255,255,255,0.8); }
                div[contenteditable="true"]:empty:before { content: attr(placeholder); color: rgba(255,255,255,0.2); pointer-events: none; display: block; }
            `}} />
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Article Body Content</label>
                <span className="text-[8px] text-white/30 lowercase font-medium">write or paste your article text. formatting is supported.</span>
            </div>
            <div className="flex flex-wrap gap-1.5 p-2 bg-[#000c24]/50 border border-white/5 rounded-t-xl">
                <button type="button" onClick={(e) => { e.preventDefault(); formatDoc('bold'); }} className="p-1 px-2.5 rounded bg-white/5 hover:bg-white/10 text-xs font-bold text-white cursor-pointer" title="Bold">B</button>
                <button type="button" onClick={(e) => { e.preventDefault(); formatDoc('italic'); }} className="p-1 px-2.5 rounded bg-white/5 hover:bg-white/10 text-xs font-bold text-white italic cursor-pointer" title="Italic">I</button>
                <button type="button" onClick={(e) => { e.preventDefault(); formatDoc('underline'); }} className="p-1 px-2.5 rounded bg-white/5 hover:bg-white/10 text-xs font-bold text-white underline cursor-pointer" title="Underline">U</button>
                <button type="button" onClick={(e) => { e.preventDefault(); formatDoc('formatBlock', 'H2'); }} className="p-1 px-2 rounded bg-white/5 hover:bg-white/10 text-xs font-bold text-white cursor-pointer" title="Heading 2">H2</button>
                <button type="button" onClick={(e) => { e.preventDefault(); formatDoc('formatBlock', 'H3'); }} className="p-1 px-2 rounded bg-white/5 hover:bg-white/10 text-xs font-bold text-white cursor-pointer" title="Heading 3">H3</button>
                <button type="button" onClick={(e) => { e.preventDefault(); formatDoc('formatBlock', 'P'); }} className="p-1 px-2 rounded bg-white/5 hover:bg-white/10 text-xs font-bold text-white cursor-pointer" title="Paragraph">P</button>
                <button type="button" onClick={(e) => { e.preventDefault(); formatDoc('insertUnorderedList'); }} className="p-1 px-2 rounded bg-white/5 hover:bg-white/10 text-xs font-bold text-white cursor-pointer" title="Bullet List">List</button>
                <button type="button" onClick={(e) => { e.preventDefault(); const url = prompt('Enter link URL:'); if (url) formatDoc('createLink', url); }} className="p-1 px-2 rounded bg-white/5 hover:bg-white/10 text-xs font-bold text-white cursor-pointer" title="Insert Link">Link</button>
                <button type="button" onClick={(e) => { e.preventDefault(); formatDoc('formatBlock', 'BLOCKQUOTE'); }} className="p-1 px-2 rounded bg-white/5 hover:bg-white/10 text-xs font-bold text-white cursor-pointer" title="Blockquote">Quote</button>
            </div>
            <div
                ref={editorRef}
                contentEditable={true}
                suppressContentEditableWarning={true}
                placeholder="Write your detailed blog article content here..."
                onInput={(e) => onChange(e.currentTarget.innerHTML)}
                onBlur={(e) => onChange(e.currentTarget.innerHTML)}
                className="w-full bg-[#000c24]/50 border border-white/5 border-t-0 focus:border-[#C9A84C]/30 rounded-b-xl px-4 py-3 text-sm text-white outline-none transition-all overflow-y-auto min-h-[300px] max-h-[600px]"
                style={{ lineHeight: '1.7' }}
            />
        </div>
    );
};

function formatContent(content) {
    if (!content) return '';
    if (/<[a-z][\s\S]*>/i.test(content)) {
        return content;
    }
    return content
        .split(/\n\s*\n/)
        .map(para => `<p>${para.replace(/\n/g, '<br />')}</p>`)
        .join('\n');
}

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Switcher: 'dashboard', 'entities', 'leaders', or 'blogs'
    const [adminSection, setAdminSection] = useState('dashboard');

    // --- VENTURES STATE ---
    const [items, setItems] = useState([]);
    const [activeTab, setActiveTab] = useState(''); // Stores the unique entity key
    const [tagline, setTagline] = useState('');
    const [tag, setTag] = useState('');
    const [desc, setDesc] = useState('');
    const [link, setLink] = useState('');
    const [img, setImg] = useState('');
    const [logo, setLogo] = useState('');
    const [sector, setSector] = useState('');
    const [newTitle, setNewTitle] = useState(''); // Serves as the editable title/name

    const [uploadingImg, setUploadingImg] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);

    // --- LEADERS STATE ---
    const [leaders, setLeaders] = useState([]);
    const [activeLeaderId, setActiveLeaderId] = useState(''); // Stores unique leader ID
    const [leaderName, setLeaderName] = useState('');
    const [leaderRole, setLeaderRole] = useState('');
    const [leaderTier, setLeaderTier] = useState('');
    const [leaderPhilosophy, setLeaderPhilosophy] = useState('');
    const [leaderVision, setLeaderVision] = useState('');
    const [leaderFocus, setLeaderFocus] = useState('');
    const [leaderLogo, setLeaderLogo] = useState('');
    const [leaderImage, setLeaderImage] = useState('');

    const [uploadingLeaderImage, setUploadingLeaderImage] = useState(false);
    const [uploadingLeaderLogo, setUploadingLeaderLogo] = useState(false);

    // --- BLOGS STATE ---
    const [blogs, setBlogs] = useState([]);
    const [activeBlogSlug, setActiveBlogSlug] = useState(''); // Stores unique blog slug
    const [blogTitle, setBlogTitle] = useState('');
    const [blogSlug, setBlogSlug] = useState('');
    const [blogCategory, setBlogCategory] = useState('Startup Funding');
    const [blogCustomCategory, setBlogCustomCategory] = useState('');
    const [blogDescription, setBlogDescription] = useState('');
    const [blogAuthor, setBlogAuthor] = useState('');
    const [blogDate, setBlogDate] = useState('');
    const [blogReadTime, setBlogReadTime] = useState('');
    const [blogImage, setBlogImage] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [blogRelated, setBlogRelated] = useState([]);
    const [uploadingBlogImage, setUploadingBlogImage] = useState(false);
    const [showFullPreviewModal, setShowFullPreviewModal] = useState(false);

    // --- DASHBOARD STATS STATE ---
    const [stats, setStats] = useState(null);
    const [aiTopic, setAiTopic] = useState('');
    const [generatingAi, setGeneratingAi] = useState(false);

    // --- GLOBAL ACTIONS ---
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '' });

    useEffect(() => {
        const initDashboard = async () => {
            try {
                // Verify auth session
                const authRes = await fetch('/api/admin/content');
                if (!authRes.ok) {
                    router.push('/admin/login');
                    return;
                }
                const authData = await authRes.json();
                setUser(authData.user);

                // Fetch ventures content
                const contentRes = await fetch('/api/content', { cache: 'no-store' });
                const contentData = await contentRes.json();
                if (contentData.portfolioItems && contentData.portfolioItems.length > 0) {
                    setItems(contentData.portfolioItems);
                    const firstItem = contentData.portfolioItems[0];
                    setActiveTab(firstItem.key);
                    loadItemData(firstItem);
                }

                // Fetch leaders content
                const leadersRes = await fetch('/api/leaders', { cache: 'no-store' });
                const leadersData = await leadersRes.json();
                if (leadersData.leaders && leadersData.leaders.length > 0) {
                    setLeaders(leadersData.leaders);
                    const firstLeader = leadersData.leaders[0];
                    setActiveLeaderId(firstLeader.id);
                    loadLeaderData(firstLeader);
                }

                // Fetch blogs content
                const blogsRes = await fetch('/api/blogs', { cache: 'no-store' });
                const blogsData = await blogsRes.json();
                if (blogsData.blogs && blogsData.blogs.length > 0) {
                    setBlogs(blogsData.blogs);
                    const firstBlog = blogsData.blogs[0];
                    setActiveBlogSlug(firstBlog.slug);
                    loadBlogData(firstBlog, blogsData.blogs);
                } else {
                    // Pre-fill fields for a new blog if none exist yet
                    handleAddNewBlogClick();
                }

                // Fetch dashboard stats
                const statsRes = await fetch('/api/admin/stats');
                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    setStats(statsData.stats);
                }

                setLoading(false);
            } catch (err) {
                console.error(err);
                router.push('/admin/login');
            }
        };

        initDashboard();
    }, [router]);

    // --- LOADER HELPERS ---
    const loadItemData = (item) => {
        setTagline(item.tagline || '');
        setTag(item.tag || '');
        setDesc(item.desc || '');
        setLink(item.link || '');
        setImg(item.img || '');
        setLogo(item.logo || '');
        setSector(item.sector || '');
        setNewTitle(item.title || '');
    };

    const loadLeaderData = (leader) => {
        setLeaderName(leader.name || '');
        setLeaderRole(leader.role || '');
        setLeaderTier(leader.tier || '');
        setLeaderPhilosophy(leader.philosophy || '');
        setLeaderVision(leader.vision || '');
        setLeaderFocus(leader.focus || '');
        setLeaderLogo(leader.logo || '');
        setLeaderImage(leader.image || '');
    };

    const loadBlogData = (blog, allBlogs = blogs) => {
        setBlogTitle(blog.title || '');
        setBlogSlug(blog.slug || '');

        const stdCategories = ["Startup Funding", "Business Growth", "Investment Tips", "Founder Stories", "Market Insights"];
        if (stdCategories.includes(blog.category)) {
            setBlogCategory(blog.category);
            setBlogCustomCategory('');
        } else {
            setBlogCategory('Other');
            setBlogCustomCategory(blog.category || '');
        }

        setBlogDescription(blog.description || '');
        setBlogAuthor(blog.author || '');
        setBlogDate(blog.date || '');
        setBlogReadTime(blog.readTime || '');
        setBlogImage(blog.image || '');
        setBlogContent(blog.content || '');
        setBlogRelated(blog.related || []);
    };

    // --- TAB CLICK HANDLERS ---
    const handleTabChange = (key) => {
        const item = items.find(i => i.key === key);
        if (item) {
            setActiveTab(key);
            loadItemData(item);
        }
    };

    const handleAddNewClick = () => {
        setActiveTab('__new__');
        setTagline('');
        setTag('');
        setDesc('');
        setLink('');
        setImg('');
        setLogo('');
        setSector('');
        setNewTitle('');
    };

    const handleLeaderTabChange = (id) => {
        const leader = leaders.find(l => l.id === id);
        if (leader) {
            setActiveLeaderId(id);
            loadLeaderData(leader);
        }
    };

    const handleAddNewLeaderClick = () => {
        setActiveLeaderId('__new__');
        setLeaderName('');
        setLeaderRole('');
        setLeaderTier('');
        setLeaderPhilosophy('');
        setLeaderVision('');
        setLeaderFocus('');
        setLeaderLogo('');
        setLeaderImage('');
    };

    const handleBlogTabChange = (slug) => {
        const blog = blogs.find(b => b.slug === slug);
        if (blog) {
            setActiveBlogSlug(slug);
            loadBlogData(blog);
        }
    };

    const handleAddNewBlogClick = () => {
        setActiveBlogSlug('__new__');
        setBlogTitle('');
        setBlogSlug('');
        setBlogCategory('Startup Funding');
        setBlogCustomCategory('');
        setBlogDescription('');
        setBlogAuthor('RiseMates Ventures');

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date().toLocaleDateString('en-US', options);
        setBlogDate(today);

        setBlogReadTime('1 min read');
        setBlogImage('');
        setBlogContent('');
        setBlogRelated([]);
    };

    const handleTitleChange = (val) => {
        setBlogTitle(val);
        if (activeBlogSlug === '__new__') {
            const slugify = (text) => text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
            setBlogSlug(slugify(val));
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: '', type: '' }), 4000);
    };

    // --- UPLOAD HANDLER ---
    const handleFileUpload = (e, type, field = 'entity') => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 8 * 1024 * 1024) {
            showToast('Selected image exceeds 8MB. Please select a smaller headshot or cover image.', 'error');
            return;
        }

        if (field === 'blog') {
            if (type === 'img') setUploadingBlogImage(true);
        } else if (field === 'leader') {
            if (type === 'img') setUploadingLeaderImage(true);
            if (type === 'logo') setUploadingLeaderLogo(true);
        } else {
            if (type === 'img') setUploadingImg(true);
            if (type === 'logo') setUploadingLogo(true);
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Url = reader.result;
            if (field === 'blog') {
                if (type === 'img') setBlogImage(base64Url);
            } else if (field === 'leader') {
                if (type === 'img') setLeaderImage(base64Url);
                if (type === 'logo') setLeaderLogo(base64Url);
            } else {
                if (type === 'img') setImg(base64Url);
                if (type === 'logo') setLogo(base64Url);
            }
            showToast(`${type === 'img' ? 'Cover image' : 'Logo badge'} converted. Commit Changes to save.`);

            if (field === 'blog') {
                setUploadingBlogImage(false);
            } else if (field === 'leader') {
                setUploadingLeaderImage(false);
                setUploadingLeaderLogo(false);
            } else {
                setUploadingImg(false);
                setUploadingLogo(false);
            }
        };

        reader.onerror = () => {
            showToast('Failed to process image file.', 'error');
            if (field === 'blog') {
                setUploadingBlogImage(false);
            } else if (field === 'leader') {
                setUploadingLeaderImage(false);
                setUploadingLeaderLogo(false);
            } else {
                setUploadingImg(false);
                setUploadingLogo(false);
            }
        };

        reader.readAsDataURL(file);
    };

    // --- SAVE VENTURES ---
    const handleSave = async (e) => {
        e.preventDefault();

        const targetTitle = newTitle.trim();
        if (!targetTitle) {
            showToast('Entity name (title) is required', 'error');
            return;
        }

        setSaving(true);

        const payload = {
            key: activeTab,
            title: targetTitle,
            tagline,
            tag,
            desc,
            img,
            logo,
            link,
            sector
        };

        try {
            const res = await fetch('/api/admin/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to save changes');
            }

            const data = await res.json();
            showToast(data.message || 'Entity changes committed successfully');

            // Refresh content from MongoDB
            const contentRes = await fetch('/api/content', { cache: 'no-store' });
            const contentData = await contentRes.json();
            if (contentData.portfolioItems) {
                setItems(contentData.portfolioItems);
                if (activeTab === '__new__' && data.key) {
                    setActiveTab(data.key);
                } else if (activeTab === '__new__') {
                    // Fallback search by title
                    const created = contentData.portfolioItems.find(i => i.title === targetTitle);
                    if (created) setActiveTab(created.key);
                }
            }
        } catch (err) {
            showToast(err.message, 'error');
        } finally {
            setSaving(false);
        }
    };

    // --- SAVE LEADERS ---
    const handleSaveLeader = async (e) => {
        e.preventDefault();

        const targetName = leaderName.trim();
        if (!targetName) {
            showToast('Leader name is required', 'error');
            return;
        }

        setSaving(true);

        const payload = {
            id: activeLeaderId,
            name: targetName,
            role: leaderRole,
            tier: leaderTier || 'Executive Tier',
            philosophy: leaderPhilosophy,
            vision: leaderVision,
            focus: leaderFocus,
            logo: leaderLogo,
            image: leaderImage
        };

        try {
            const res = await fetch('/api/admin/leaders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to save leader');
            }

            const data = await res.json();
            showToast(data.message || 'Leader changes committed successfully');

            // Refresh leaders list
            const leadersRes = await fetch('/api/leaders', { cache: 'no-store' });
            const leadersData = await leadersRes.json();
            if (leadersData.leaders) {
                setLeaders(leadersData.leaders);
                if (activeLeaderId === '__new__' && data.id) {
                    setActiveLeaderId(data.id);
                }
            }
        } catch (err) {
            showToast(err.message, 'error');
        } finally {
            setSaving(false);
        }
    };

    // --- SAVE BLOGS ---
    const handleSaveBlog = async (e) => {
        e.preventDefault();

        const targetTitle = blogTitle.trim();
        if (!targetTitle) {
            showToast('Blog title is required', 'error');
            return;
        }
        if (!blogContent.trim()) {
            showToast('Blog content HTML is required', 'error');
            return;
        }

        setSaving(true);

        const finalCategory = blogCategory === 'Other' ? blogCustomCategory.trim() : blogCategory;
        if (!finalCategory) {
            showToast('Blog category is required', 'error');
            setSaving(false);
            return;
        }

        const payload = {
            slug: activeBlogSlug,
            title: targetTitle,
            category: finalCategory,
            description: blogDescription,
            author: blogAuthor,
            date: blogDate,
            readTime: blogReadTime,
            image: blogImage,
            content: blogContent,
            related: blogRelated
        };

        try {
            const res = await fetch('/api/admin/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to save blog post');
            }

            const data = await res.json();
            showToast(data.message || 'Blog post committed successfully');

            // Refresh blogs list
            const blogsRes = await fetch('/api/blogs', { cache: 'no-store' });
            const blogsData = await blogsRes.json();
            if (blogsData.blogs) {
                setBlogs(blogsData.blogs);
                if (activeBlogSlug === '__new__' && data.slug) {
                    setActiveBlogSlug(data.slug);
                    const saved = blogsData.blogs.find(b => b.slug === data.slug);
                    if (saved) loadBlogData(saved, blogsData.blogs);
                } else {
                    const saved = blogsData.blogs.find(b => b.slug === activeBlogSlug || b.title === targetTitle);
                    if (saved) {
                        setActiveBlogSlug(saved.slug);
                        loadBlogData(saved, blogsData.blogs);
                    }
                }
            }
        } catch (err) {
            showToast(err.message, 'error');
        } finally {
            setSaving(false);
        }
    };

    // --- DELETE BLOG ---
    const handleDeleteBlog = async () => {
        if (activeBlogSlug === '__new__') return;

        if (!window.confirm(`Are you absolutely sure you want to permanently delete "${blogTitle}"?`)) {
            return;
        }

        setSaving(true);

        try {
            const res = await fetch('/api/admin/blogs', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug: activeBlogSlug })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to delete blog post');
            }

            const data = await res.json();
            showToast(data.message || 'Blog post deleted successfully');

            // Refresh blogs list
            const blogsRes = await fetch('/api/blogs', { cache: 'no-store' });
            const blogsData = await blogsRes.json();
            if (blogsData.blogs) {
                setBlogs(blogsData.blogs);
                if (blogsData.blogs.length > 0) {
                    const firstBlog = blogsData.blogs[0];
                    setActiveBlogSlug(firstBlog.slug);
                    loadBlogData(firstBlog, blogsData.blogs);
                } else {
                    handleAddNewBlogClick();
                }
            }
        } catch (err) {
            showToast(err.message, 'error');
        } finally {
            setSaving(false);
        }
    };

    const toggleRelatedBlog = (slug) => {
        if (blogRelated.includes(slug)) {
            setBlogRelated(blogRelated.filter(s => s !== slug));
        } else {
            setBlogRelated([...blogRelated, slug]);
        }
    };


    const handleGenerateAiBlog = async () => {
        if (!aiTopic.trim() || generatingAi) return;
        setGeneratingAi(true);
        showToast("Sarvam AI is writing your article. Please wait...", "info");

        try {
            const res = await fetch('/api/admin/blogs/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: aiTopic })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to generate AI blog');
            }

            const data = await res.json();
            const { blog } = data;

            setBlogTitle(blog.title || '');
            setBlogDescription(blog.description || '');
            setBlogCategory(blog.category || 'Startup Funding');
            setBlogReadTime(blog.readTime || '5 min read');
            setBlogContent(blog.content || '');
            setBlogCustomCategory('');
            
            const slugify = (text) => text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
            setBlogSlug(slugify(blog.title));

            showToast("AI blog draft generated successfully! Check visual preview and hit Save.");
            setAiTopic('');
        } catch (err) {
            showToast(err.message, 'error');
        } finally {
            setGeneratingAi(false);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/admin/stats');
            if (res.ok) {
                const data = await res.json();
                setStats(data.stats);
            }
        } catch (err) {
            console.error("Failed to load admin stats:", err);
        }
    };

    useEffect(() => {
        if (adminSection === 'dashboard') {
            fetchStats();
            const interval = setInterval(fetchStats, 15000); // refresh every 15s
            return () => clearInterval(interval);
        }
    }, [adminSection]);

    useEffect(() => {
        if (blogContent) {
            const cleanText = blogContent.replace(/<[^>]*>/g, ' ');
            const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
            const minutes = Math.max(Math.ceil(words / 200), 1);
            setBlogReadTime(`${minutes} min read`);
        } else {
            setBlogReadTime('1 min read');
        }
    }, [blogContent]);

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout', { method: 'POST' });
            router.push('/admin/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    if (loading) {
        return (
            <div className="bg-[#000c24] text-white min-h-screen flex flex-col items-center justify-center grain">
                <div className="w-16 h-16 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin mb-6" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C9A84C] animate-pulse">Establishing Secure Stream</span>
            </div>
        );
    }

    const currentItem = items.find(i => i.key === activeTab);
    const currentLeader = leaders.find(l => l.id === activeLeaderId);
    const currentBlog = blogs.find(b => b.slug === activeBlogSlug);

    const activeCategoryLabel = blogCategory === 'Other' ? (blogCustomCategory || 'Custom Category') : blogCategory;

    return (
        <div className="bg-[#000c24] text-white min-h-screen flex flex-col grain selection:bg-[#C9A84C] selection:text-dark">
            {/* Header */}
            <header className="border-b border-white/5 bg-[#001233]/40 backdrop-blur-md px-6 md:px-12 py-5 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#002366] to-[#C9A84C] flex items-center justify-center border border-white/10 shadow-lg">
                        <span className="material-symbols-outlined text-sm">shield</span>
                    </div>
                    <div>
                        <h1 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-1.5">
                            Sovereign <span className="text-[#C9A84C] italic">Console</span>
                        </h1>
                        <p className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Control Panel · Welcome, {user?.username || 'Admin'}</p>
                    </div>
                </div>

                {/* Main Navigation Section Switcher */}
                <div className="hidden sm:flex items-center bg-[#000c24]/85 border border-white/5 p-1 rounded-xl">
                    <button
                        onClick={() => setAdminSection('dashboard')}
                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${adminSection === 'dashboard' ? 'bg-[#C9A84C] text-dark shadow-md' : 'text-white/40 hover:text-white'
                            }`}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setAdminSection('entities')}
                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${adminSection === 'entities' ? 'bg-[#C9A84C] text-dark shadow-md' : 'text-white/40 hover:text-white'
                            }`}
                    >
                        Sovereign Ventures
                    </button>
                    <button
                        onClick={() => setAdminSection('leaders')}
                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${adminSection === 'leaders' ? 'bg-[#C9A84C] text-dark shadow-md' : 'text-white/40 hover:text-white'
                            }`}
                    >
                        Leadership Board
                    </button>
                    <button
                        onClick={() => setAdminSection('blogs')}
                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${adminSection === 'blogs' ? 'bg-[#C9A84C] text-dark shadow-md' : 'text-white/40 hover:text-white'
                            }`}
                    >
                        Ecosystem Blogs
                    </button>
                </div>

                <div className="flex items-center gap-6">
                    <a href="/" target="_blank" className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-[#C9A84C] transition-colors flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                        View Portal
                    </a>
                    <button
                        onClick={handleLogout}
                        className="text-[10px] font-bold uppercase tracking-widest text-[#ef4444] hover:text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-sm">logout</span>
                        Disconnect
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Section Switcher */}
            <div className="flex sm:hidden bg-[#001233]/40 border-b border-white/5 p-2 items-center justify-around gap-2">
                <button
                    onClick={() => setAdminSection('dashboard')}
                    className={`flex-1 py-2 text-[9px] font-black uppercase tracking-wider text-center rounded-lg cursor-pointer ${adminSection === 'dashboard' ? 'bg-[#C9A84C] text-dark' : 'text-white/50'
                        }`}
                >
                    Dash
                </button>
                <button
                    onClick={() => setAdminSection('entities')}
                    className={`flex-1 py-2 text-[9px] font-black uppercase tracking-wider text-center rounded-lg cursor-pointer ${adminSection === 'entities' ? 'bg-[#C9A84C] text-dark' : 'text-white/50'
                        }`}
                >
                    Ventures
                </button>
                <button
                    onClick={() => setAdminSection('leaders')}
                    className={`flex-1 py-2 text-[9px] font-black uppercase tracking-wider text-center rounded-lg cursor-pointer ${adminSection === 'leaders' ? 'bg-[#C9A84C] text-dark' : 'text-white/50'
                        }`}
                >
                    Leaders
                </button>
                <button
                    onClick={() => setAdminSection('blogs')}
                    className={`flex-1 py-2 text-[9px] font-black uppercase tracking-wider text-center rounded-lg cursor-pointer ${adminSection === 'blogs' ? 'bg-[#C9A84C] text-dark' : 'text-white/50'
                        }`}
                >
                    Blogs
                </button>
            </div>

            {/* Main Area */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* --- DASHBOARD SECTION --- */}
                {adminSection === 'dashboard' && (
                    <div className="lg:col-span-12 space-y-8">
                        {/* Header Summary */}
                        <div className="bg-[#001233]/20 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
                            <div>
                                <h2 className="text-2xl font-black uppercase tracking-tight text-white">Ecosystem Intelligence Console</h2>
                                <p className="text-xs text-white/45 mt-1">Real-time telemetry, newsletter reach, and recent contact inquiries.</p>
                            </div>
                            <button
                                onClick={fetchStats}
                                className="bg-white/5 hover:bg-white/10 text-white border border-white/5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all"
                            >
                                <span className="material-symbols-outlined text-sm animate-spin-slow">sync</span>
                                Refresh Data
                            </button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Live Active Users */}
                            <div className="bg-[#001233]/30 border border-white/5 rounded-2xl p-6 shadow-md relative overflow-hidden group">
                                <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-2">Live Active Users</span>
                                <div className="text-3xl font-black text-white font-primary mb-1">
                                    {stats ? stats.activeUsersCount : '...'}
                                </div>
                                <p className="text-[9px] text-white/30">Visits within the last 5 minutes</p>
                            </div>

                            {/* Total Visits */}
                            <div className="bg-[#001233]/30 border border-white/5 rounded-2xl p-6 shadow-md">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-2">Total Unique Visits</span>
                                <div className="text-3xl font-black text-white font-primary mb-1">
                                    {stats ? stats.sessionsCount : '...'}
                                </div>
                                <p className="text-[9px] text-white/30">Cumulative lifetime sessions</p>
                            </div>

                            {/* Total Inquiries */}
                            <div className="bg-[#001233]/30 border border-white/5 rounded-2xl p-6 shadow-md">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-2">Business Inquiries</span>
                                <div className="text-3xl font-black text-[#C9A84C] font-primary mb-1">
                                    {stats ? stats.contactsCount : '...'}
                                </div>
                                <p className="text-[9px] text-white/30">Filled contact forms in MongoDB</p>
                            </div>

                            {/* Subscribers */}
                            <div className="bg-[#001233]/30 border border-white/5 rounded-2xl p-6 shadow-md">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-2">Newsletter Reach</span>
                                <div className="text-3xl font-black text-white font-primary mb-1">
                                    {stats ? stats.subscribersCount : '...'}
                                </div>
                                <p className="text-[9px] text-white/30">Total newsletter subscribers</p>
                            </div>
                        </div>

                        {/* Recent Inquiries Table */}
                        <div className="bg-[#001233]/30 border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#C9A84C] block mb-6 border-b border-white/5 pb-3">Recent Contact Inquiries</span>
                            
                            <div className="overflow-x-auto w-full">
                                {stats?.recentContacts && stats.recentContacts.length > 0 ? (
                                    <table className="w-full text-left text-xs border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/5 text-white/40">
                                                <th className="py-3 px-4 font-bold uppercase tracking-wider">Date</th>
                                                <th className="py-3 px-4 font-bold uppercase tracking-wider">Contact</th>
                                                <th className="py-3 px-4 font-bold uppercase tracking-wider">Area of Interest</th>
                                                <th className="py-3 px-4 font-bold uppercase tracking-wider">Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {stats.recentContacts.map((contact, idx) => {
                                                const formattedDate = new Date(contact.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                });
                                                return (
                                                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors text-white/80">
                                                        <td className="py-3.5 px-4 font-mono text-[10px] text-white/55 whitespace-nowrap">{formattedDate}</td>
                                                        <td className="py-3.5 px-4">
                                                            <div className="font-bold text-white">{contact.name}</div>
                                                            <div className="text-[10px] text-white/40">{contact.email}</div>
                                                            {contact.phone && <div className="text-[10px] text-white/30">{contact.phone}</div>}
                                                        </td>
                                                        <td className="py-3.5 px-4">
                                                            <span className="inline-block px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold uppercase text-[#C9A84C] whitespace-nowrap">
                                                                {contact.interest}
                                                            </span>
                                                        </td>
                                                        <td className="py-3.5 px-4 text-white/60 leading-relaxed min-w-[200px] max-w-sm whitespace-pre-wrap">{contact.message}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center py-10 text-white/30 italic">
                                        No contact inquiries submitted yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- VENTURES SECTION --- */}
                {adminSection === 'entities' && (
                    <>
                        <div className="lg:col-span-7 space-y-8">
                            {/* Entity Tabs */}
                            <div className="flex gap-2 p-1.5 bg-[#001233]/50 border border-white/5 rounded-2xl overflow-x-auto items-center">
                                {items.map((item, idx) => {
                                    const key = item.key;
                                    const name = item.title;
                                    const isActive = activeTab === key;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleTabChange(key)}
                                            className={`flex-1 min-w-[120px] py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${isActive
                                                ? 'bg-gradient-to-r from-[#002366] to-[#C9A84C] text-white shadow-lg'
                                                : 'text-white/40 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {name}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={handleAddNewClick}
                                    className={`min-w-[120px] py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer border border-dashed flex items-center justify-center gap-1.5 ${activeTab === '__new__'
                                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg border-transparent'
                                        : 'text-emerald-400 border-emerald-500/20 hover:text-emerald-300 hover:bg-emerald-500/5'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-xs">add</span>
                                    Add New
                                </button>
                            </div>

                            {/* Venture Edit Form */}
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[#001233]/30 border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl"
                            >
                                <div className="flex items-center justify-between border-b border-white/5 pb-5 mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold uppercase tracking-tight">
                                            {activeTab === '__new__' ? 'Create New Venture' : 'Edit Venture Properties'}
                                        </h3>
                                        <p className="text-xs text-white/40 mt-1">
                                            {activeTab === '__new__' ? 'Define a new dynamic enterprise in the portfolio registry.' : 'Configure live text data, links, and branding visuals.'}
                                        </p>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A84C] bg-[#C9A84C]/5 border border-[#C9A84C]/10 px-3 py-1.5 rounded-lg">
                                        {activeTab === '__new__' ? 'New Venture' : (sector || 'Venture Module')}
                                    </span>
                                </div>

                                <form onSubmit={handleSave} className="space-y-6">
                                    {/* Entity Name and Sector fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Entity Key</label>
                                            <input
                                                type="text"
                                                value={activeTab === '__new__' ? 'SYSTEM GENERATED' : activeTab.toUpperCase()}
                                                disabled
                                                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white/40 outline-none cursor-not-allowed"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Entity Name (Title)</label>
                                            <input
                                                type="text"
                                                value={newTitle}
                                                onChange={(e) => setNewTitle(e.target.value)}
                                                placeholder="e.g. BWorth Premium"
                                                required
                                                className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Sector (Category)</label>
                                            <input
                                                type="text"
                                                value={sector}
                                                onChange={(e) => setSector(e.target.value)}
                                                placeholder="e.g. Sustainable Fashion"
                                                required
                                                className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Tagline</label>
                                            <input
                                                type="text"
                                                value={tagline}
                                                onChange={(e) => setTagline(e.target.value)}
                                                placeholder="Enter core tagline"
                                                className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Tag (Sector Label)</label>
                                            <input
                                                type="text"
                                                value={tag}
                                                onChange={(e) => setTag(e.target.value)}
                                                placeholder="e.g. Circular Luxury"
                                                className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Destination Link</label>
                                        <input
                                            type="url"
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                            placeholder="https://..."
                                            className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Overview Description</label>
                                        <textarea
                                            value={desc}
                                            onChange={(e) => setDesc(e.target.value)}
                                            placeholder="Enter descriptive copy for this entity..."
                                            rows={4}
                                            className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all resize-none leading-relaxed"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                        {/* Cover Image Upload */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45 block">Cover Image</label>
                                            <div className="relative border border-white/5 rounded-2xl bg-[#000c24]/30 h-32 flex flex-col items-center justify-center overflow-hidden group hover:border-[#C9A84C]/20 transition-all">
                                                {img ? (
                                                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40">
                                                        <Image src={img} alt="Cover Preview" fill className="object-cover opacity-80" unoptimized={true} />
                                                        <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                                                            <span className="material-symbols-outlined text-white text-xl">upload_file</span>
                                                            <span className="text-[8px] font-black uppercase text-white/80">Change Cover</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span className="material-symbols-outlined text-white/30 text-3xl mb-2 group-hover:text-[#C9A84C] transition-colors">image</span>
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Click to Upload Cover</span>
                                                        <span className="text-[8px] text-white/20 font-bold uppercase">PNG, JPG, WEBP</span>
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileUpload(e, 'img', 'entity')}
                                                    disabled={uploadingImg}
                                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                />
                                            </div>
                                        </div>

                                        {/* Logo Upload */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45 block">Entity Logo</label>
                                            <div className="relative border border-white/5 rounded-2xl bg-[#000c24]/30 h-32 flex flex-col items-center justify-center overflow-hidden group hover:border-[#C9A84C]/20 transition-all">
                                                {logo ? (
                                                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40">
                                                        <div className="w-16 h-16 bg-white rounded-full p-2 border border-white/10 flex items-center justify-center">
                                                            <Image src={logo} alt="Logo Preview" width={48} height={48} className="object-contain" unoptimized={true} />
                                                        </div>
                                                        <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                                                            <span className="material-symbols-outlined text-white text-xl">upload_file</span>
                                                            <span className="text-[8px] font-black uppercase text-white/80">Change Logo</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span className="material-symbols-outlined text-white/30 text-3xl mb-2 group-hover:text-[#C9A84C] transition-colors">circle</span>
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Click to Upload Logo</span>
                                                        <span className="text-[8px] text-white/20 font-bold uppercase">PNG, JPG, WEBP</span>
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileUpload(e, 'logo', 'entity')}
                                                    disabled={uploadingLogo}
                                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={saving || uploadingImg || uploadingLogo}
                                        className="w-full bg-[#C9A84C] hover:bg-[#b0913b] text-dark font-black text-xs uppercase tracking-widest py-4.5 rounded-xl transition-all shadow-xl shadow-[#C9A84C]/5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-6"
                                    >
                                        {saving ? (
                                            <span className="animate-pulse">Committing changes to database...</span>
                                        ) : (
                                            <>
                                                <span>Commit Changes to Live Database</span>
                                                <span className="material-symbols-outlined text-sm font-bold">save_as</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        </div>

                        {/* Venture Preview Card */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="border border-white/5 rounded-3xl p-6 bg-[#001233]/20 shadow-xl sticky top-28">
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#C9A84C] block mb-6 border-b border-white/5 pb-3">Live Visual Preview (Registry View)</span>

                                <div className="w-full max-w-sm mx-auto h-[400px] bg-[#f8f9fa] border border-dark/5 shadow-2xl rounded-[35px] overflow-hidden flex flex-col justify-between p-8 relative group transition-all duration-700 ease-out select-none">
                                    {logo && (
                                        <div className="absolute inset-0 w-full h-full opacity-[0.25] pointer-events-none z-0">
                                            <Image src={logo} alt="" fill className="object-contain p-6 filter grayscale mix-blend-multiply" unoptimized={true} />
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between z-10 relative">
                                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-dark/30 block">Entity Model</span>
                                        {logo && (
                                            <div className="w-12 h-12 bg-white rounded-full p-2 border border-dark/5 shadow-sm flex items-center justify-center">
                                                <Image src={logo} alt="" width={32} height={32} className="object-contain" unoptimized={true} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="z-10 relative flex flex-col justify-end h-full pt-20">
                                        <h4 className="text-2xl font-black text-dark leading-none mb-2">
                                            {newTitle || 'Entity Name'}
                                        </h4>
                                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-4">
                                            {sector || 'Venture Sector'}
                                        </span>

                                        <div className="w-6 h-[2px] bg-blue-600/30 mb-4" />

                                        <p className="text-[11px] text-dark/60 font-secondary leading-relaxed h-16 overflow-hidden text-ellipsis">
                                            {desc || 'Description text placeholder... edit properties in the form on the left to see live values rendered here.'}
                                        </p>

                                        <div className="mt-4 border-t border-dark/5 pt-4 flex justify-between items-center text-dark/30 text-[9px] font-bold uppercase tracking-wider">
                                            <span>Tag: {tag || 'None'}</span>
                                            <span>Link: {link ? 'Valid URL' : 'None'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-6">
                                    <p className="text-[10px] text-white/30 italic">This card simulates how the details card dynamically maps on the about page.</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* --- LEADERS SECTION --- */}
                {adminSection === 'leaders' && (
                    <>
                        <div className="lg:col-span-7 space-y-8">
                            {/* Leader Tabs */}
                            <div className="flex gap-2 p-1.5 bg-[#001233]/50 border border-white/5 rounded-2xl overflow-x-auto items-center">
                                {leaders.map((leader, idx) => {
                                    const id = leader.id;
                                    const name = leader.name;
                                    const isActive = activeLeaderId === id;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleLeaderTabChange(id)}
                                            className={`flex-1 min-w-[120px] py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${isActive
                                                ? 'bg-gradient-to-r from-[#002366] to-[#C9A84C] text-white shadow-lg'
                                                : 'text-white/40 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {name}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={handleAddNewLeaderClick}
                                    className={`min-w-[120px] py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer border border-dashed flex items-center justify-center gap-1.5 ${activeLeaderId === '__new__'
                                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg border-transparent'
                                        : 'text-emerald-400 border-emerald-500/20 hover:text-emerald-300 hover:bg-emerald-500/5'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-xs">person_add</span>
                                    Add Leader
                                </button>
                            </div>

                            {/* Leader Edit Form */}
                            <motion.div
                                key={activeLeaderId}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[#001233]/30 border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl"
                            >
                                <div className="flex items-center justify-between border-b border-white/5 pb-5 mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold uppercase tracking-tight">
                                            {activeLeaderId === '__new__' ? 'Register New Leader' : 'Edit Executive Details'}
                                        </h3>
                                        <p className="text-xs text-white/40 mt-1">
                                            Manage executive biographies, roles, corporate quotes, and headshots.
                                        </p>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A84C] bg-[#C9A84C]/5 border border-[#C9A84C]/10 px-3 py-1.5 rounded-lg">
                                        {activeLeaderId === '__new__' ? 'New Executive' : (leaderTier || 'Leader Profile')}
                                    </span>
                                </div>

                                <form onSubmit={handleSaveLeader} className="space-y-6">
                                    {/* Leader Name, Tier and Role fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Leader ID</label>
                                            <input
                                                type="text"
                                                value={activeLeaderId === '__new__' ? 'AUTO ASSIGNED' : activeLeaderId.toUpperCase()}
                                                disabled
                                                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-white/40 outline-none cursor-not-allowed"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Leader Name</label>
                                            <input
                                                type="text"
                                                value={leaderName}
                                                onChange={(e) => setLeaderName(e.target.value)}
                                                placeholder="e.g. Saurabh Jain"
                                                required
                                                className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Executive Tier</label>
                                            <input
                                                type="text"
                                                value={leaderTier}
                                                onChange={(e) => setLeaderTier(e.target.value)}
                                                placeholder="e.g. Executive Tier 001"
                                                className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Role & Company Linkage</label>
                                            <input
                                                type="text"
                                                value={leaderRole}
                                                onChange={(e) => setLeaderRole(e.target.value)}
                                                placeholder="e.g. Founder & CEO · Vega Vrudhi"
                                                className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Core Focus Area</label>
                                            <input
                                                type="text"
                                                value={leaderFocus}
                                                onChange={(e) => setLeaderFocus(e.target.value)}
                                                placeholder="e.g. Strategic Expansion & FMCG Operations"
                                                className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Corporate Philosophy Quote</label>
                                        <input
                                            type="text"
                                            value={leaderPhilosophy}
                                            onChange={(e) => setLeaderPhilosophy(e.target.value)}
                                            placeholder="e.g. Building on-ground execution intelligence via..."
                                            className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Strategic Vision Details</label>
                                        <textarea
                                            value={leaderVision}
                                            onChange={(e) => setLeaderVision(e.target.value)}
                                            placeholder="Detail the leader's strategic roadmap or executive vision..."
                                            rows={3}
                                            className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all resize-none leading-relaxed"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                        {/* Headshot Upload */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45 block">Leader Headshot (Photo)</label>
                                            <div className="relative border border-white/5 rounded-2xl bg-[#000c24]/30 h-32 flex flex-col items-center justify-center overflow-hidden group hover:border-[#C9A84C]/20 transition-all">
                                                {leaderImage ? (
                                                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40">
                                                        <Image src={leaderImage} alt="Headshot Preview" fill className="object-cover opacity-80 object-top" unoptimized={true} />
                                                        <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                                                            <span className="material-symbols-outlined text-white text-xl">upload_file</span>
                                                            <span className="text-[8px] font-black uppercase text-white/80">Change Headshot</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span className="material-symbols-outlined text-white/30 text-3xl mb-2 group-hover:text-[#C9A84C] transition-colors">account_box</span>
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Upload Executive Photo</span>
                                                        <span className="text-[8px] text-white/20 font-bold uppercase">PNG, JPG, WEBP</span>
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileUpload(e, 'img', 'leader')}
                                                    disabled={uploadingLeaderImage}
                                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                />
                                            </div>
                                        </div>

                                        {/* Affiliate Logo Upload */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45 block">Affiliated Company Logo (Optional)</label>
                                            <div className="relative border border-white/5 rounded-2xl bg-[#000c24]/30 h-32 flex flex-col items-center justify-center overflow-hidden group hover:border-[#C9A84C]/20 transition-all">
                                                {leaderLogo ? (
                                                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40">
                                                        <div className="w-12 h-12 bg-white rounded-xl p-1 flex items-center justify-center">
                                                            <Image src={leaderLogo} alt="Affiliate Logo Preview" width={36} height={36} className="object-contain" unoptimized={true} />
                                                        </div>
                                                        <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                                                            <span className="material-symbols-outlined text-white text-xl">upload_file</span>
                                                            <span className="text-[8px] font-black uppercase text-white/80">Change Logo</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span className="material-symbols-outlined text-white/30 text-3xl mb-2 group-hover:text-[#C9A84C] transition-colors">circle</span>
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Upload Company Badge</span>
                                                        <span className="text-[8px] text-white/20 font-bold uppercase">PNG, JPG, WEBP</span>
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileUpload(e, 'logo', 'leader')}
                                                    disabled={uploadingLeaderLogo}
                                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={saving || uploadingLeaderImage || uploadingLeaderLogo}
                                        className="w-full bg-[#C9A84C] hover:bg-[#b0913b] text-dark font-black text-xs uppercase tracking-widest py-4.5 rounded-xl transition-all shadow-xl shadow-[#C9A84C]/5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-6"
                                    >
                                        {saving ? (
                                            <span className="animate-pulse">Committing changes to database...</span>
                                        ) : (
                                            <>
                                                <span>Commit Leader to Database</span>
                                                <span className="material-symbols-outlined text-sm font-bold">save_as</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        </div>

                        {/* Leader Preview Card */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="border border-white/5 rounded-3xl p-6 bg-[#001233]/20 shadow-xl sticky top-28">
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#C9A84C] block mb-6 border-b border-white/5 pb-3">Live Visual Preview (Leadership View)</span>

                                <div className="w-full max-w-sm mx-auto bg-white border border-dark/5 shadow-2xl rounded-[35px] overflow-hidden flex flex-col justify-between group transition-all duration-700 ease-out select-none">

                                    {/* Top Image area */}
                                    <div className="relative aspect-[4/3] bg-dark/10 overflow-hidden">
                                        {leaderImage ? (
                                            <Image src={leaderImage} alt="" fill className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-1000" unoptimized={true} />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-dark/20">
                                                <span className="material-symbols-outlined text-white/50 text-4xl">account_circle</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent" />

                                        {/* Name & Role overlay */}
                                        <div className="absolute bottom-5 left-5 right-5 z-10">
                                            <h3 className="text-lg font-black text-white leading-tight mb-1 uppercase">
                                                {leaderName || 'Leader Name'}
                                            </h3>
                                            <p className="text-[8px] font-black uppercase tracking-widest text-white/55">
                                                {leaderRole || 'Founder & CEO'}
                                            </p>
                                        </div>

                                        {/* Logo badge overlay */}
                                        {leaderLogo && (
                                            <div className="absolute bottom-5 right-5 z-20">
                                                <div className="w-8 h-8 bg-white rounded-lg p-1.5 shadow-md flex items-center justify-center">
                                                    <Image src={leaderLogo} alt="" width={20} height={20} className="object-contain" unoptimized={true} />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content area */}
                                    <div className="p-6 flex flex-col flex-grow text-dark">
                                        {/* Philosophy */}
                                        <div className="mb-4 border-l-2 border-blue-600/30 pl-3">
                                            <p className="text-xs text-dark/85 font-medium leading-relaxed italic">
                                                "{leaderPhilosophy || 'philosophy quote...'}"
                                            </p>
                                        </div>

                                        {/* Vision & Focus */}
                                        <div className="mt-auto pt-4 border-t border-dark/5 grid grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="text-[8px] font-black uppercase tracking-widest text-dark/40 mb-1.5">Strategic Vision</h5>
                                                <p className="text-[10px] text-dark/60 leading-normal line-clamp-3">{leaderVision || 'vision...'}</p>
                                            </div>
                                            <div>
                                                <h5 className="text-[8px] font-black uppercase tracking-widest text-dark/40 mb-1.5">Core Focus</h5>
                                                <p className="text-[10px] text-dark/60 leading-normal line-clamp-3">{leaderFocus || 'focus...'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-6">
                                    <p className="text-[10px] text-white/30 italic">This card simulates how the leadership headshot card maps on the Home/Leadership page.</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* --- BLOGS SECTION --- */}
                {adminSection === 'blogs' && (
                    <>
                        <div className="lg:col-span-7 space-y-8">
                            {/* Blog Tabs */}
                            <div className="flex gap-2 p-1.5 bg-[#001233]/50 border border-white/5 rounded-2xl overflow-x-auto items-center">
                                {blogs.map((blog, idx) => {
                                    const slug = blog.slug;
                                    const name = blog.title;
                                    const isActive = activeBlogSlug === slug;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleBlogTabChange(slug)}
                                            className={`flex-1 min-w-[150px] py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer truncate ${isActive
                                                ? 'bg-gradient-to-r from-[#002366] to-[#C9A84C] text-white shadow-lg'
                                                : 'text-white/40 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {name}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={handleAddNewBlogClick}
                                    className={`min-w-[150px] py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer border border-dashed flex items-center justify-center gap-1.5 ${activeBlogSlug === '__new__'
                                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg border-transparent'
                                        : 'text-emerald-400 border-emerald-500/20 hover:text-emerald-300 hover:bg-emerald-500/5'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-xs">add</span>
                                    Add Blog
                                </button>
                            </div>

                            {/* Blog Edit Form */}
                            <motion.div
                                key={activeBlogSlug}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[#001233]/30 border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl"
                            >
                                <div className="flex items-center justify-between border-b border-white/5 pb-5 mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold uppercase tracking-tight">
                                            {activeBlogSlug === '__new__' ? 'Draft Ecosystem Article' : 'Edit Article details'}
                                        </h3>
                                        <p className="text-xs text-white/40 mt-1">
                                            Compose industry insights, assign read metrics, select categories, and link related posts.
                                        </p>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A84C] bg-[#C9A84C]/5 border border-[#C9A84C]/10 px-3 py-1.5 rounded-lg">
                                        {activeCategoryLabel}
                                    </span>
                                </div>

                                <form onSubmit={handleSaveBlog} className="space-y-6">

                                    {/* Title and Slug fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Article Title</label>
                                            <input
                                                type="text"
                                                value={blogTitle}
                                                onChange={(e) => handleTitleChange(e.target.value)}
                                                placeholder="e.g. How to Scale Sales Teams"
                                                required
                                                className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45 block">
                                                Custom URL Route (Slug)
                                                {activeBlogSlug !== '__new__' && <span className="text-[8px] text-amber-500/70 lowercase font-medium ml-1.5">(Modifying this shifts URL links)</span>}
                                            </label>
                                            <input
                                                type="text"
                                                value={blogSlug}
                                                onChange={(e) => setBlogSlug(e.target.value)}
                                                placeholder={activeBlogSlug === '__new__' ? "System auto-generates slug from Title if empty" : "e.g. how-to-scale-teams"}
                                                className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Category Selectors */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Category Option</label>
                                            <select
                                                value={blogCategory}
                                                onChange={(e) => setBlogCategory(e.target.value)}
                                                className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all cursor-pointer"
                                            >
                                                <option value="Startup Funding" className="bg-[#000c24] text-white">Startup Funding</option>
                                                <option value="Business Growth" className="bg-[#000c24] text-white">Business Growth</option>
                                                <option value="Investment Tips" className="bg-[#000c24] text-white">Investment Tips</option>
                                                <option value="Founder Stories" className="bg-[#000c24] text-white">Founder Stories</option>
                                                <option value="Market Insights" className="bg-[#000c24] text-white">Market Insights</option>
                                                <option value="Other" className="bg-[#000c24] text-white">Other (Custom)...</option>
                                            </select>
                                        </div>

                                        {blogCategory === 'Other' && (
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">Custom Category Name</label>
                                                <input
                                                    type="text"
                                                    value={blogCustomCategory}
                                                    onChange={(e) => setBlogCustomCategory(e.target.value)}
                                                    placeholder="Enter custom category"
                                                    required
                                                    className="w-full bg-[#000c24]/40 border border-[#C9A84C]/25 focus:border-[#C9A84C]/50 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Author, Date, and Read Time */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Author Name</label>
                                            <input
                                                type="text"
                                                value={blogAuthor}
                                                onChange={(e) => setBlogAuthor(e.target.value)}
                                                placeholder="e.g. Saurabh Jain"
                                                required
                                                className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Publish Date</label>
                                            <input
                                                type="text"
                                                value={blogDate}
                                                onChange={(e) => setBlogDate(e.target.value)}
                                                placeholder="e.g. June 30, 2026"
                                                required
                                                className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Read Time Estimation</label>
                                            <input
                                                type="text"
                                                value={blogReadTime}
                                                onChange={(e) => setBlogReadTime(e.target.value)}
                                                placeholder="e.g. 5 min read"
                                                required
                                                className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Short Summary (Description)</label>
                                        <textarea
                                            value={blogDescription}
                                            onChange={(e) => setBlogDescription(e.target.value)}
                                            placeholder="Write a short summary displayed on the blog catalog list..."
                                            rows={2}
                                            className="w-full bg-[#000c24]/40 border border-white/5 focus:border-[#C9A84C]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all resize-none leading-relaxed"
                                        />
                                    </div>

                                    {/* Image Upload */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/45 block">Featured Image</label>
                                        <div className="relative border border-white/5 rounded-2xl bg-[#000c24]/30 h-40 flex flex-col items-center justify-center overflow-hidden group hover:border-[#C9A84C]/20 transition-all">
                                            {blogImage ? (
                                                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40">
                                                    <img src={blogImage} alt="Featured Cover" className="w-full h-full object-cover opacity-80" />
                                                    <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                                                        <span className="material-symbols-outlined text-white text-xl">upload_file</span>
                                                        <span className="text-[8px] font-black uppercase text-white/80">Change Cover image</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined text-white/30 text-3xl mb-2 group-hover:text-[#C9A84C] transition-colors">image</span>
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Click to Upload Featured Cover</span>
                                                    <span className="text-[8px] text-white/20 font-bold uppercase">PNG, JPG, WEBP (Max 8MB)</span>
                                                </>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'img', 'blog')}
                                                disabled={uploadingBlogImage}
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                            />
                                        </div>
                                    </div>

                                    {/* AI Blog Writer */}
                                    <div className="p-4 bg-[#C9A84C]/5 border border-[#C9A84C]/15 rounded-2xl space-y-3">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#C9A84C] text-lg">psychology</span>
                                            <h4 className="text-xs font-black uppercase tracking-wider text-white">AI Article Drafter (Sarvam AI)</h4>
                                        </div>
                                        <div className="flex gap-2">
                                            <input 
                                                type="text"
                                                value={aiTopic}
                                                onChange={(e) => setAiTopic(e.target.value)}
                                                placeholder="Describe topic, e.g. Scaling Managed Sales Force in India"
                                                className="flex-1 bg-[#000c24]/50 border border-white/5 rounded-xl px-4 py-2 text-xs text-white placeholder-white/20 outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleGenerateAiBlog}
                                                disabled={generatingAi || !aiTopic.trim()}
                                                className="bg-[#C9A84C] hover:bg-[#b0913b] text-dark text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all cursor-pointer disabled:opacity-40"
                                            >
                                                {generatingAi ? 'Drafting...' : 'Draft Blog'}
                                            </button>
                                        </div>
                                        <p className="text-[9px] text-white/35">Describe your topic. Sarvam AI will automatically generate the title, description, category, and full HTML content for you.</p>
                                    </div>

                                    {/* Content Editor */}
                                    <WysiwygEditor value={blogContent} onChange={setBlogContent} />

                                    {/* Related Articles checkboxes */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/45">Link Related Articles</label>
                                        <div className="border border-white/5 rounded-xl bg-[#000c24]/30 p-4 max-h-48 overflow-y-auto space-y-2.5">
                                            {blogs.filter(b => b.slug !== activeBlogSlug).length === 0 ? (
                                                <p className="text-[10px] text-white/25 italic">No other articles in ecosystem to link</p>
                                            ) : (
                                                blogs.filter(b => b.slug !== activeBlogSlug).map((otherBlog) => {
                                                    const isChecked = blogRelated.includes(otherBlog.slug);
                                                    return (
                                                        <label key={otherBlog.slug} className="flex items-center gap-3 cursor-pointer text-xs text-white/70 hover:text-white select-none">
                                                            <input
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                onChange={() => toggleRelatedBlog(otherBlog.slug)}
                                                                className="w-4 h-4 rounded border-white/10 text-[#C9A84C] focus:ring-[#C9A84C]/20 bg-[#000c24] cursor-pointer"
                                                            />
                                                            <span>{otherBlog.title}</span>
                                                        </label>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-4">
                                        <button
                                            type="submit"
                                            disabled={saving || uploadingBlogImage}
                                            className={`font-black text-xs uppercase tracking-widest py-4.5 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${activeBlogSlug === '__new__'
                                                ? 'sm:col-span-12 bg-[#C9A84C] hover:bg-[#b0913b] text-dark shadow-[#C9A84C]/5'
                                                : 'sm:col-span-8 bg-[#C9A84C] hover:bg-[#b0913b] text-dark shadow-[#C9A84C]/5'
                                                }`}
                                        >
                                            {saving ? (
                                                <span className="animate-pulse">Saving changes...</span>
                                            ) : (
                                                <>
                                                    <span>Commit Article to Database</span>
                                                    <span className="material-symbols-outlined text-sm font-bold">save_as</span>
                                                </>
                                            )}
                                        </button>

                                        {activeBlogSlug !== '__new__' && (
                                            <button
                                                type="button"
                                                onClick={handleDeleteBlog}
                                                disabled={saving}
                                                className="sm:col-span-4 bg-red-600/10 hover:bg-red-600/25 border border-red-500/20 hover:border-red-500/40 text-red-300 font-black text-xs uppercase tracking-widest py-4.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                                            >
                                                <span>Delete Article</span>
                                                <span className="material-symbols-outlined text-sm font-bold">delete_forever</span>
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </motion.div>
                        </div>

                        {/* Blog Card Preview */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="border border-white/5 rounded-3xl p-6 bg-[#001233]/20 shadow-xl sticky top-28">
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#C9A84C] block mb-6 border-b border-white/5 pb-3">Live Visual Preview (Catalog Card View)</span>

                                <div className="w-full max-w-sm mx-auto bg-white border border-dark/5 shadow-2xl rounded-[28px] overflow-hidden flex flex-col justify-between group transition-all duration-500 text-dark select-none">
                                    <div>
                                        <div className="relative aspect-[16/10] block overflow-hidden bg-dark/10">
                                            {blogImage ? (
                                                <img
                                                    src={blogImage}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-dark/30">
                                                    <span className="material-symbols-outlined text-4xl">image</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="px-3 py-1 bg-[#FAF9F6] border border-dark/5 text-[9px] font-black uppercase tracking-wider text-[#002366] rounded-md">
                                                    {activeCategoryLabel}
                                                </span>
                                                <span className="text-[10px] text-dark/45 font-bold uppercase tracking-wider">
                                                    {blogReadTime || '5 min read'}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-black text-dark tracking-tight leading-snug mb-3 line-clamp-2">
                                                {blogTitle || 'Blog Post Title'}
                                            </h3>

                                            <p className="text-xs text-dark/60 font-secondary leading-relaxed line-clamp-3">
                                                {blogDescription || 'Overview description copy... write summary details inside the form to populate details here.'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 pt-0 border-t border-dark/5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#002366]/10 flex items-center justify-center font-black text-xs text-[#002366] uppercase">
                                                {(blogAuthor || 'A').charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-dark leading-none">{blogAuthor || 'Author Name'}</p>
                                                <p className="text-[9px] font-bold text-dark/40 uppercase tracking-widest mt-1">{blogDate || 'Publish Date'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-6 space-y-4">
                                    <p className="text-[10px] text-white/30 italic">This card simulates how the article listing card scales on the main blogs registry page.</p>

                                    <button
                                        type="button"
                                        onClick={() => setShowFullPreviewModal(true)}
                                        className="w-full bg-[#002366] hover:bg-[#001c52] text-white border border-white/5 font-black text-xs uppercase tracking-widest py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-sm">visibility</span>
                                        <span>Preview Full Article Layout</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </main>

            {/* Full Article Preview Overlay Modal */}
            <AnimatePresence>
                {showFullPreviewModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
                        onClick={() => setShowFullPreviewModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-[#FAF9F6] text-dark w-full max-w-3xl rounded-[32px] overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="bg-[#000c24] text-white px-8 py-4.5 flex items-center justify-between border-b border-white/5 sticky top-0 z-20">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A84C]">Sovereign Article Preview</span>
                                <button
                                    onClick={() => setShowFullPreviewModal(false)}
                                    className="text-white/60 hover:text-white flex items-center justify-center cursor-pointer border border-white/10 hover:border-white/20 w-8 h-8 rounded-full transition-all"
                                >
                                    <span className="material-symbols-outlined text-base">close</span>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 md:p-12 overflow-y-auto flex-1 font-secondary">
                                {/* Category, Date, Read Time */}
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-3 py-1 bg-white border border-dark/10 text-[10px] font-black uppercase tracking-wider text-[#002366] rounded-md">
                                        {activeCategoryLabel}
                                    </span>
                                    <span className="text-xs text-dark/45 font-bold uppercase tracking-wider">
                                        {blogReadTime || '5 min read'}
                                    </span>
                                    <span className="text-dark/20">•</span>
                                    <span className="text-xs text-dark/45 font-bold uppercase tracking-wider">
                                        {blogDate || 'Publish Date'}
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-dark tracking-tighter leading-tight mb-8">
                                    {blogTitle || 'Blog Post Title'}
                                </h1>

                                {/* Author banner */}
                                <div className="flex items-center gap-4 border-y border-dark/5 py-4 mb-8">
                                    <div className="w-10 h-10 rounded-full bg-[#002366] text-white flex items-center justify-center font-black text-sm uppercase">
                                        {(blogAuthor || 'A').charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-dark leading-none">{blogAuthor || 'Author Name'}</p>
                                        <p className="text-[8px] font-bold text-dark/40 uppercase tracking-widest mt-1">Managing Partner</p>
                                    </div>
                                </div>

                                {/* Cover image */}
                                {blogImage && (
                                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 border border-dark/5 shadow-sm">
                                        <img src={blogImage} alt="" className="w-full h-full object-cover" />
                                    </div>
                                )}

                                {/* Content body */}
                                <div
                                    className="prose prose-sm max-w-none text-dark/85 leading-relaxed space-y-4 font-secondary"
                                    dangerouslySetInnerHTML={{ __html: formatContent(blogContent) || '<p className="italic text-dark/30">Write blog content in the form editor to preview...</p>' }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast Alert */}
            <AnimatePresence>
                {toast.message && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 50, x: '-50%' }}
                        className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider z-[100] border shadow-2xl flex items-center gap-2 ${toast.type === 'error'
                            ? 'bg-red-950/80 border-red-500/20 text-red-300'
                            : 'bg-[#001233]/90 border-[#C9A84C]/25 text-[#C9A84C]'
                            }`}
                    >
                        <span className="material-symbols-outlined text-sm font-bold">
                            {toast.type === 'error' ? 'error' : 'task_alt'}
                        </span>
                        <span>{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
