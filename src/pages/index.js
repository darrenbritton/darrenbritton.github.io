import React, { useEffect, useRef, useState } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import Seo from "../components/seo";
import PhotoStrip from "../components/photoStrip";
import HeroScene from "../components/heroScene";
import signatureImg from "./portfolio/images/signature.png";

const INITIAL_PROJECTS = 4;

const Index = ({ data, location }) => {
  const projects = (data.allMarkdownRemark.edges || []).map(({ node }) => node);
  const devallyShot = getImage(data.devallyShot);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = showAllProjects
    ? projects
    : projects.slice(0, INITIAL_PROJECTS);

  const rootRef = useRef(null);

  // Live Dublin clock in the hero meta. Fills in client-side only, so SSR
  // markup matches the first client render.
  const [dublinTime, setDublinTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Dublin",
    });
    const update = () => setDublinTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  // GSAP choreography. Only initialises while html[data-motion="on"]; the
  // motion toggle flips the attribute and this observer builds or fully
  // reverts the whole system (ScrollTriggers, inline styles, listeners).
  useEffect(() => {
    let api = null;
    let cancelled = false;

    const motionOff = () =>
      document.documentElement.getAttribute("data-motion") === "off";

    const init = async () => {
      if (cancelled || api || motionOff()) return;
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || motionOff() || api) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // hero entrance
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .fromTo(
            ".hero h1",
            { y: 64, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.15 },
            0.15
          )
          .fromTo(
            ".hero-sub",
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.95 },
            0.42
          )
          .fromTo(
            ".hero-meta",
            { y: 26, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, stagger: 0.14 },
            0.58
          )
          .fromTo(
            ".hero-fig",
            { opacity: 0 },
            { opacity: 1, duration: 0.9 },
            0.95
          )
          .add(() => {
            const ul = document.querySelector(".hero h1 .ul");
            if (ul) ul.classList.add("lit");
          }, 0.9);

        // single reveals
        gsap.utils.toArray("[data-anim]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 38, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            }
          );
        });

        // staggered groups
        gsap.utils.toArray("[data-anim-group]").forEach((wrapEl) => {
          const kids = Array.from(wrapEl.children).filter(
            (c) => !c.hasAttribute("data-noanim")
          );
          gsap.fromTo(
            kids,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
              stagger: 0.09,
              scrollTrigger: { trigger: wrapEl, start: "top 86%" },
            }
          );
        });

        // outlined ghost numerals drift against the scroll
        gsap.utils.toArray(".ghost").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -14 },
            {
              yPercent: 16,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

        // hero constellation recedes as you leave
        gsap.to(".hero-scene", {
          yPercent: 16,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // product shot parallax
        gsap.fromTo(
          ".flagship .shot-img",
          { y: 44 },
          {
            y: -26,
            ease: "none",
            scrollTrigger: {
              trigger: ".flagship .shot",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        // photography frames drift at alternating rates
        gsap.utils.toArray(".beyond .strip > *").forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: i % 2 ? 28 : -8 },
            {
              y: i % 2 ? -20 : 14,
              ease: "none",
              scrollTrigger: {
                trigger: ".beyond .strip",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

        // experience line draws down the timeline
        gsap.fromTo(
          ".exp-line",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".exp .roles",
              start: "top 78%",
              end: "bottom 40%",
              scrub: true,
            },
          }
        );

        // page progress
        gsap.fromTo(
          ".progress",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
          }
        );
      }, rootRef);

      // magnetic contact CTA (fine pointers only)
      let magnetCleanup = () => {};
      if (window.matchMedia("(pointer: fine)").matches) {
        const cta = rootRef.current
          ? rootRef.current.querySelector(".contact .cta")
          : null;
        if (cta) {
          const onMove = (e) => {
            const r = cta.getBoundingClientRect();
            gsap.to(cta, {
              x: (e.clientX - (r.left + r.width / 2)) * 0.08,
              y: (e.clientY - (r.top + r.height / 2)) * 0.16,
              duration: 0.5,
              ease: "power3.out",
            });
          };
          const onLeave = () =>
            gsap.to(cta, {
              x: 0,
              y: 0,
              duration: 0.7,
              ease: "elastic.out(1, 0.45)",
            });
          cta.addEventListener("pointermove", onMove);
          cta.addEventListener("pointerleave", onLeave);
          magnetCleanup = () => {
            cta.removeEventListener("pointermove", onMove);
            cta.removeEventListener("pointerleave", onLeave);
          };
        }
      }

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }

      api = {
        kill: () => {
          magnetCleanup();
          ctx.revert();
        },
      };
    };

    const destroy = () => {
      if (api) {
        api.kill();
        api = null;
      }
    };

    init();
    const mo = new MutationObserver(() => {
      if (motionOff()) destroy();
      else init();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });

    return () => {
      cancelled = true;
      mo.disconnect();
      destroy();
    };
  }, []);

  return (
    <Layout location={location}>
      <div ref={rootRef}>
        <div className="progress" aria-hidden="true" />
        <span id="top" />

        {/* =================== HERO =================== */}
        <header className="hero">
          <HeroScene />
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-main">
                <h1 data-hero>
                  I build{" "}
                  <span className="ul">
                    systems
                    <span className="ul-line" aria-hidden="true">
                      systems
                    </span>
                  </span>{" "}
                  <span className="light">and the teams that build them.</span>
                </h1>
                <p className="hero-sub" data-hero>
                  Co-founder and CTO at DevAlly. A hands-on engineering leader,
                  still deploying daily.
                </p>
              </div>
              <div className="hero-side">
                <div className="hero-meta" data-hero>
                  <b>Co-founder &amp; CTO, DevAlly</b>
                  <br />
                  Prev. Principal Engineer, Shutterstock
                </div>
                <div className="hero-meta" data-hero>
                  <b>Hands-On Engineering Leader</b>
                  <br />
                  Dublin, IE
                  {dublinTime && (
                    <span className="clock"> · {dublinTime} local</span>
                  )}
                </div>
              </div>
            </div>
            <p className="hero-fig" data-hero aria-hidden="true">
              fig. 01: a system, assembling itself
            </p>
          </div>
        </header>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            <span>
              Distributed systems&nbsp;·&nbsp;LLM-powered
              products&nbsp;·&nbsp;Developer tooling&nbsp;·&nbsp;Engineering
              leadership&nbsp;·&nbsp;Dublin, Ireland&nbsp;·&nbsp;
            </span>
            <span>
              Distributed systems&nbsp;·&nbsp;LLM-powered
              products&nbsp;·&nbsp;Developer tooling&nbsp;·&nbsp;Engineering
              leadership&nbsp;·&nbsp;Dublin, Ireland&nbsp;·&nbsp;
            </span>
          </div>
        </div>
        <p className="visually-hidden">
          Focus areas: distributed systems, LLM-powered products, developer
          tooling, engineering leadership. Based in Dublin, Ireland.
        </p>

        {/* =================== ABOUT =================== */}
        <section id="about" className="about sec-rel">
          <span className="ghost" aria-hidden="true">
            01
          </span>
          <div className="wrap">
            <div className="sec-head" data-anim>
              <span className="num">01</span>
              <h2 className="title">About</h2>
              <span className="meta">Who / What / Where</span>
            </div>
            <div className="body">
              <div className="lead" data-anim>
                <p>
                  At DevAlly we're making digital accessibility something product
                  teams <span className="hl">build in, not bolt on</span> at the
                  end. I lead from inside the work: still writing and reviewing
                  code, still shaping the architecture, never far from the
                  keyboard.
                </p>
                <p>
                  Before DevAlly, I spent the best part of seven years at
                  Shutterstock, rising to Principal Software Engineer, leading
                  architecture for the Content Services org. It was a long lesson
                  in scale, and in keeping things simple enough to survive it.
                </p>
                <div className="sig">
                  <img
                    className="sig-img"
                    src={signatureImg}
                    alt="Darren Britton signature"
                  />
                </div>
              </div>
              <div className="meta" data-anim>
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
                      Distributed systems architecture at scale, LLM-powered
                      products, developer tooling, engineering leadership
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
                      <a href="https://ie.linkedin.com/in/darrenbritton">
                        LinkedIn
                      </a>{" "}
                      · <a href="https://twitter.com/darren_britton">X</a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* =================== FLAGSHIP / DEVALLY =================== */}
        <section id="devally" className="flagship sec-rel">
          <span className="ghost" aria-hidden="true">
            02
          </span>
          <div className="wrap">
            <div className="sec-head" data-anim>
              <span className="num">02</span>
              <h2 className="title">Currently Building</h2>
              <span className="meta">2024–Present</span>
            </div>
            <div className="head">
              <span className="eyebrow">
                Co-founder &amp; Chief Technology Officer
              </span>
            </div>
            <div className="brand" data-anim>
              <img
                className="logo-light"
                src="https://devally.com/devally-logo.svg"
                alt="DevAlly"
              />
              <img
                className="logo-dark"
                src="https://devally.com/devally-logo-light.svg"
                alt="DevAlly"
              />
            </div>
            <div className="role" data-anim>
              <b>An AI-powered accessibility platform</b>, made in Dublin
            </div>
            <div className="body">
              <div className="desc" data-anim>
                <p>
                  We help product teams{" "}
                  <span className="hl">audit, prioritise and fix</span>{" "}
                  accessibility issues in minutes, then keep them fixed with
                  continuous monitoring. Accessibility, embedded into the
                  development workflow instead of bolted on before a deadline.
                </p>
                <p>
                  As CTO I own the technical vision: the architecture behind
                  automated WCAG auditing, the AI and LLM systems that make it
                  scale, and the engineering team building it.
                </p>
                <a
                  className="go"
                  href="https://devally.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit devally.com <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="shot" data-anim>
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
              <div className="stats" data-anim-group>
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
              <div className="backed" data-anim>
                Backed by Miles Ahead · Enterprise Ireland · NDRC
              </div>
            </div>
          </div>
        </section>

        {/* =================== EXPERIENCE =================== */}
        <section id="experience" className="exp sec-rel">
          <span className="ghost" aria-hidden="true">
            03
          </span>
          <div className="wrap">
            <div className="sec-head" data-anim>
              <span className="num">03</span>
              <h2 className="title">Experience</h2>
              <span className="meta">2016–Present</span>
            </div>
            <div className="body">
              <div className="roles" data-anim-group>
                <span className="exp-line" aria-hidden="true" data-noanim />
                <div className="role">
                  <div className="when">2024–Now</div>
                  <div>
                    <div className="co">DevAlly</div>
                    <div className="what">
                      Co-founder &amp; Chief Technology Officer
                    </div>
                  </div>
                  <div className="badge">Current</div>
                </div>
                <div className="role">
                  <div className="when">2023–2024</div>
                  <div>
                    <div className="co">Shutterstock</div>
                    <div className="what">
                      Principal Software Engineer · Content Services
                    </div>
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
                    <div className="what">
                      UX Application Developer · SAP AppHaus
                    </div>
                  </div>
                  <div className="badge" />
                </div>
              </div>
              <div className="side" data-anim>
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
            <div className="sec-head" data-anim>
              <span className="num">·</span>
              <h2 className="title">Beyond the day job</h2>
              <span className="meta">Side projects &amp; a camera</span>
            </div>
            <div className="body">
              <div className="os" data-anim-group>
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
                    {showAllProjects
                      ? "View less"
                      : `View all ${projects.length}`}
                    <span className="pm" aria-hidden="true">
                      {showAllProjects ? "−" : "+"}
                    </span>
                  </button>
                )}
              </div>
              <div className="ph" data-anim>
                <h3>Photography</h3>
                <PhotoStrip />
                <div className="cap">
                  I shoot, occasionally. A few recent frames.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================== CONTACT =================== */}
        <section id="contact" className="contact sec-rel">
          <span className="ghost" aria-hidden="true">
            04
          </span>
          <div className="wrap">
            <div className="sec-head" data-anim>
              <span className="num">04</span>
              <h2 className="title">Contact</h2>
              <span className="meta">Say Hello</span>
            </div>
            <div className="big" data-anim>
              <a className="cta" href="https://ie.linkedin.com/in/darrenbritton">
                <span className="cta-text">
                  Get in <span className="accent">touch</span>
                </span>
                <span className="cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
            <div className="links" data-anim-group>
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
      </div>
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
