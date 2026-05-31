import React, { useEffect } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import Seo from "../components/seo";

// Split a lede on its highlight phrase and wrap that phrase in the accent.
const renderLede = (lede, highlight) => {
  if (!lede) return null;
  if (highlight && lede.includes(highlight)) {
    const [before, after] = lede.split(highlight);
    return (
      <p className="lede reveal">
        {before}
        <span className="hl">{highlight}</span>
        {after}
      </p>
    );
  }
  return <p className="lede reveal">{lede}</p>;
};

const BlogPost = ({ data, location }) => {
  const post = data.markdownRemark;
  const fm = post.frontmatter;
  const eyebrow = fm.eyebrow || "Project";
  const crumb = fm.crumb || "Portfolio";
  const figImage = fm.image ? getImage(fm.image) : null;
  const links = fm.links || [];

  // Next project, cycling through all posts in date order.
  const all = data.allMarkdownRemark.edges;
  const idx = all.findIndex((e) => e.node.fields.slug === post.fields.slug);
  const next = idx >= 0 ? all[(idx + 1) % all.length].node : null;

  useEffect(() => {
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    document.querySelectorAll(".reveal").forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 80, 300)}ms`;
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Layout location={location}>
      <article className="post">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="sep" aria-hidden="true">
              /
            </span>
            <a href="/#beyond">{crumb}</a>
            <span className="sep" aria-hidden="true">
              /
            </span>
            <span className="here">{fm.title}</span>
          </nav>

          <header className="post-head">
            <span className="eyebrow reveal">{eyebrow}</span>
            <h1 className="reveal">{fm.title}</h1>
            {renderLede(fm.lede, fm.ledeHighlight)}
            <div className="post-metarow reveal">
              {(fm.tags || []).map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
              <span className="read">{post.timeToRead} min read</span>
              {fm.year && <span className="read">{fm.year}</span>}
            </div>
          </header>

          <div className="post-body">
            <div className="post-main">
              <div
                className="col reveal"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
              {links.length > 0 && (
                <div className="post-actions reveal">
                  {links.map((link) => (
                    <a
                      key={link.url}
                      className={`btn ${link.primary ? "primary" : "ghost"}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <figure className="figure reveal">
              {figImage ? (
                <GatsbyImage image={figImage} alt={fm.title} className="figimg" />
              ) : (
                <div className="ph-img">
                  <span>Project screenshot</span>
                </div>
              )}
              <figcaption>{fm.title}</figcaption>
            </figure>
          </div>

          <div className="wrap" style={{ padding: 0 }}>
            <div className="post-foot">
              <a href="/#beyond">
                <span aria-hidden="true">←</span> All projects
              </a>
              {next && (
                <span className="next">
                  Next&nbsp;&nbsp;
                  <a href={next.fields.slug}>
                    {next.frontmatter.title} <span aria-hidden="true">→</span>
                  </a>
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;

export const Head = ({ data }) => (
  <Seo title={`${data.markdownRemark.frontmatter.title} · Darren Britton`} />
);

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      fields {
        slug
      }
      frontmatter {
        title
        year: date(formatString: "YYYY")
        tags
        eyebrow
        crumb
        lede
        ledeHighlight
        links {
          label
          url
          primary
        }
        image {
          childImageSharp {
            gatsbyImageData(width: 1100, placeholder: BLURRED, formats: [AUTO, WEBP])
          }
        }
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
