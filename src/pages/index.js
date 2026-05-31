import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import Seo from "../components/seo";
import PhotoStrip from "../components/photoStrip";
import signatureImg from "./portfolio/images/signature.png";

const INITIAL_PROJECTS = 4;

const Index = ({ data, location }) => {
  const projects = (data.allMarkdownRemark.edges || []).map(({ node }) => node);
  const devallyShot = getImage(data.devallyShot);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = showAllProjects
    ? projects
    : projects.slice(0, INITIAL_PROJECTS);

  useEffect(() => {
    const ul = document.querySelector(".hero h1 .ul");
    let litTimer;
    if (ul) litTimer = setTimeout(() => ul.classList.add("lit"), 480);

    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return () => litTimer && clearTimeout(litTimer);

    document.querySelectorAll("header.hero, main > section").forEach((sec) => {
      sec.querySelectorAll(".reveal").forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i * 70, 280)}ms`;
      });
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => {
      if (litTimer) clearTimeout(litTimer);
      io.disconnect();
    };
  }, []);

  return (
    <Layout location={location}>
      <span id="top" />

      {/* =================== HERO =================== */}
      <header className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-main">
              <h1 className="reveal">
                I build{" "}
                <span className="ul">
                  systems
                  <span className="ul-line" aria-hidden="true">
                    systems
                  </span>
                </span>{" "}
                <span className="light">and the teams that build them.</span>
              </h1>
              <p className="hero-sub reveal">
                Co-founder and CTO at DevAlly. A hands-on engineering leader, still
                deploying daily.
              </p>
            </div>
            <div className="hero-side">
              <div className="hero-meta reveal">
                <b>Co-founder &amp; CTO, DevAlly</b>
                <br />
                Prev. Principal Engineer, Shutterstock
              </div>
              <div className="hero-meta reveal">
                <b>Hands-On Engineering Leader</b>
                <br />
                Dublin, IE
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =================== ABOUT =================== */}
      <section id="about" className="about">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="num">01</span>
            <h2 className="title">About</h2>
            <span className="meta">Who / What / Where</span>
          </div>
          <div className="body reveal">
            <div className="lead">
              <p>
                At DevAlly we're making digital accessibility something product
                teams <span className="hl">build in, not bolt on</span> at the end.
                I lead from inside the work: still writing and reviewing code, still
                shaping the architecture, never far from the keyboard.
              </p>
              <p>
                Before DevAlly, I spent the best part of seven years at Shutterstock,
                rising to Principal Software Engineer, leading architecture for the
                Content Services org. It was a long lesson in scale, and in keeping
                things simple enough to survive it.
              </p>
              <div className="sig">
                <img className="sig-img" src={signatureImg} alt="Darren Britton signature" />
              </div>
            </div>
            <div className="meta">
              <dl>
                <div className="kv">
                  <dt>Role</dt>
                  <dd>Co-founder &amp; CTO, DevAlly</dd>
                </div>
                <div className="kv">
                  <dt>Previously</dt>
                  <dd>Principal Software Engineer, Shutterstock</dd>
                </div>
                <div className="kv">
                  <dt>Based</dt>
                  <dd>Dublin, Ireland</dd>
                </div>
                <div className="kv">
                  <dt>Focus</dt>
                  <dd>
                    Distributed systems architecture at scale, LLM-powered products,
                    developer tooling, engineering leadership
                  </dd>
                </div>
                <div className="kv">
                  <dt>Education</dt>
                  <dd>BSc Computer Science, 1st Class Honours, TU Dublin</dd>
                </div>
                <div className="kv">
                  <dt>Elsewhere</dt>
                  <dd>
                    <a href="https://github.com/darrenbritton">GitHub</a> ·{" "}
                    <a href="https://ie.linkedin.com/in/darrenbritton">LinkedIn</a> ·{" "}
                    <a href="https://twitter.com/darren_britton">X</a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* =================== FLAGSHIP / DEVALLY =================== */}
      <section id="devally" className="flagship">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="num">02</span>
            <h2 className="title">Currently Building</h2>
            <span className="meta">2024–Present</span>
          </div>
          <div className="head">
            <span className="eyebrow">Co-founder &amp; Chief Technology Officer</span>
          </div>
          <div className="brand reveal">
            <img className="logo-light" src="https://devally.com/devally-logo.svg" alt="DevAlly" />
            <img className="logo-dark" src="https://devally.com/devally-logo-light.svg" alt="DevAlly" />
          </div>
          <div className="role reveal">
            <b>An AI-powered accessibility platform</b>, made in Dublin
          </div>
          <div className="body">
            <div className="desc reveal">
              <p>
                We help product teams{" "}
                <span className="hl">audit, prioritise and fix</span> accessibility
                issues in minutes, then keep them fixed with continuous monitoring.
                Accessibility, embedded into the development workflow instead of bolted
                on before a deadline.
              </p>
              <p>
                As CTO I own the technical vision: the architecture behind automated
                WCAG auditing, the AI and LLM systems that make it scale, and the
                engineering team building it.
              </p>
              <a className="go" href="https://devally.com" target="_blank" rel="noopener noreferrer">
                Visit devally.com <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="shot reveal">
              {devallyShot ? (
                <GatsbyImage
                  image={devallyShot}
                  alt="DevAlly automated accessibility audit dashboard"
                  className="shot-img"
                  objectFit="cover"
                />
              ) : (
                <div className="ph-img">
                  <span>DevAlly product screenshot</span>
                </div>
              )}
            </div>
            <div className="stats reveal">
              <div className="stat">
                <div className="n">€2M</div>
                <div className="l">
                  Pre-seed raised
                  <br />
                  2025
                </div>
              </div>
              <div className="stat">
                <div className="n">2024</div>
                <div className="l">
                  Co-founded
                  <br />
                  in Dublin
                </div>
              </div>
              <div className="stat">
                <div className="n">AI-native</div>
                <div className="l">
                  Code-level fixes
                  <br />
                  in GitHub &amp; CI/CD
                </div>
              </div>
              <div className="stat">
                <div className="n">Featured in</div>
                <div className="l">
                  TechCrunch · Fortune
                  <br />
                  Web Summit
                </div>
              </div>
            </div>
            <div className="backed reveal">
              Backed by Miles Ahead · Enterprise Ireland · NDRC
            </div>
          </div>
        </div>
      </section>

      {/* =================== EXPERIENCE =================== */}
      <section id="experience" className="exp">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="num">03</span>
            <h2 className="title">Experience</h2>
            <span className="meta">2016–Present</span>
          </div>
          <div className="body">
            <div className="roles reveal">
              <div className="role">
                <div className="when">2024–Now</div>
                <div>
                  <div className="co">DevAlly</div>
                  <div className="what">Co-founder &amp; Chief Technology Officer</div>
                </div>
                <div className="badge">Current</div>
              </div>
              <div className="role">
                <div className="when">2023–2024</div>
                <div>
                  <div className="co">Shutterstock</div>
                  <div className="what">Principal Software Engineer · Content Services</div>
                </div>
                <div className="badge" />
              </div>
              <div className="role">
                <div className="when">2021–2023</div>
                <div>
                  <div className="co">Shutterstock</div>
                  <div className="what">Staff Software Engineer</div>
                </div>
                <div className="badge" />
              </div>
              <div className="role">
                <div className="when">2019–2021</div>
                <div>
                  <div className="co">Shutterstock</div>
                  <div className="what">Senior Software Engineer</div>
                </div>
                <div className="badge" />
              </div>
              <div className="role">
                <div className="when">2017–2019</div>
                <div>
                  <div className="co">Shutterstock</div>
                  <div className="what">Software Engineer · Editorial</div>
                </div>
                <div className="badge" />
              </div>
              <div className="role">
                <div className="when">2016–2017</div>
                <div>
                  <div className="co">SAP</div>
                  <div className="what">UX Application Developer · SAP AppHaus</div>
                </div>
                <div className="badge" />
              </div>
            </div>
            <div className="side reveal">
              <h3>Education</h3>
              <div className="edu">
                BSc Computer Science
                <small>1st Class Honours · TU Dublin · 2012–2016</small>
              </div>
              <h3 style={{ marginTop: 40 }}>Recognition</h3>
              <div className="award">
                Startup Battlefield 2024<small>TechCrunch Disrupt</small>
              </div>
              <div className="award">
                Slush 100, Top 3<small>Slush · 2024</small>
              </div>
              <div className="award">
                Best Project, DIT Project Fair<small>SAP · 2016</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== BEYOND =================== */}
      <section id="beyond" className="beyond acc-mute">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="num">·</span>
            <h2 className="title">Beyond the day job</h2>
            <span className="meta">Side projects &amp; a camera</span>
          </div>
          <div className="body">
            <div className="os reveal">
              <h3>Projects</h3>
              {visibleProjects.map((node) => (
                <a key={node.fields.slug} href={node.fields.slug}>
                  <span className="t">{node.frontmatter.title}</span>
                  <span className="d">
                    {(node.frontmatter.tags || []).slice(0, 2).join(" · ")}
                  </span>
                </a>
              ))}
              {projects.length > INITIAL_PROJECTS && (
                <button
                  type="button"
                  className="more"
                  onClick={() => setShowAllProjects((v) => !v)}
                  aria-expanded={showAllProjects}
                >
                  {showAllProjects ? "View less" : `View all ${projects.length}`}
                  <span className="pm" aria-hidden="true">
                    {showAllProjects ? "−" : "+"}
                  </span>
                </button>
              )}
            </div>
            <div className="ph reveal">
              <h3>Photography</h3>
              <PhotoStrip />
              <div className="cap">I shoot, occasionally. A few recent frames.</div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== CONTACT =================== */}
      <section id="contact" className="contact">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="num">04</span>
            <h2 className="title">Contact</h2>
            <span className="meta">Say Hello</span>
          </div>
          <div className="big reveal">
            <a className="cta" href="https://ie.linkedin.com/in/darrenbritton">
              <span className="cta-text">
                Get in <span className="accent">touch</span>
              </span>
              <span className="cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
          <div className="links reveal">
            <div className="col">
              <div className="lbl">Social</div>
              <a href="https://twitter.com/darren_britton">
                X / Twitter <span aria-hidden="true">↗</span>
              </a>
              <a href="https://github.com/darrenbritton">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a href="https://ie.linkedin.com/in/darrenbritton">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="col">
              <div className="lbl">Index</div>
              <a href="#about">About</a>
              <a href="#devally">DevAlly</a>
              <a href="#experience">Experience</a>
            </div>
            <div className="col">
              <div className="lbl">Now</div>
              <a href="https://devally.com">Co-founder &amp; CTO</a>
              <a href="https://devally.com">DevAlly</a>
              <a href="#top">Dublin, IE</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

export const Head = () => <Seo />;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tags
          }
        }
      }
    }
    devallyShot: file(relativePath: { eq: "images/devally-hero.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 1100
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
      }
    }
  }
`;
