import { PropsWithChildren, UIEvent, useEffect, useRef, useState } from "react";

import heroPortrait from "./assets/projects/avatar.jpg";
import { siteContent } from "./src/data/content";
import { portfolioProjects } from "./src/data/projects";
import { MediaImage, MediaVideo, ProjectEntry } from "./src/types/project";

type ProjectMediaAsset =
  | { type: "video"; video: MediaVideo; alt: string }
  | { type: "image"; image: MediaImage; alt: string };

type ActiveProjectState = {
  assetIndex: number;
  project: ProjectEntry;
};

const getProjectAssets = (project: ProjectEntry): ProjectMediaAsset[] => [
  ...(project.video
    ? [
        {
          type: "video" as const,
          video: project.video,
          alt: `${project.title} ${siteContent.projectsSection.walkthroughVideoSuffix}`,
        },
      ]
    : []),
  ...project.images.map((image) => ({
    type: "image" as const,
    image,
    alt: image.alt,
  })),
];

function MediaStrip({
  label,
  children,
}: PropsWithChildren<{ label: string }>) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const node = scrollRef.current;

    if (!node) {
      return;
    }

    const maxScrollLeft = node.scrollWidth - node.clientWidth;
    setCanScrollLeft(node.scrollLeft > 4);
    setCanScrollRight(maxScrollLeft - node.scrollLeft > 4);
  };

  useEffect(() => {
    updateScrollState();

    const node = scrollRef.current;

    if (!node || typeof ResizeObserver === "undefined") {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState();
    });

    resizeObserver.observe(node);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleScroll = (_event: UIEvent<HTMLDivElement>) => {
    updateScrollState();
  };

  const scrollByPage = (direction: number) => {
    const node = scrollRef.current;

    if (!node) {
      return;
    }

    node.scrollBy({
      left: direction * 196,
      behavior: "smooth",
    });
  };

  return (
    <div className="media-strip-shell">
      <button
        type="button"
        className="media-strip-nav media-strip-nav-prev"
        aria-label={`Scroll ${label} left`}
        onClick={() => scrollByPage(-1)}
        disabled={!canScrollLeft}
      >
        <span aria-hidden="true">←</span>
      </button>

      <div
        ref={scrollRef}
        className="media-strip"
        aria-label={label}
        onScroll={handleScroll}
      >
        {children}
      </div>

      <button
        type="button"
        className="media-strip-nav media-strip-nav-next"
        aria-label={`Scroll ${label} right`}
        onClick={() => scrollByPage(1)}
        disabled={!canScrollRight}
      >
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

export default function App() {
  const [activeProject, setActiveProject] = useState<ActiveProjectState | null>(null);

  useEffect(() => {
    document.title = siteContent.meta.title;
  }, []);

  const openProjectAsset = (project: ProjectEntry, assetIndex = 0) => {
    setActiveProject({
      project,
      assetIndex,
    });
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }

      if (!activeProject) {
        return;
      }

      const assets = getProjectAssets(activeProject.project);

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveProject((current) =>
          current
            ? {
                ...current,
                assetIndex: (current.assetIndex - 1 + assets.length) % assets.length,
              }
            : null,
        );
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveProject((current) =>
          current
            ? {
                ...current,
                assetIndex: (current.assetIndex + 1) % assets.length,
              }
            : null,
        );
      }
    };

    document.body.style.overflow = activeProject ? "hidden" : "";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeProject]);

  const activeAssets = activeProject ? getProjectAssets(activeProject.project) : [];
  const currentAsset = activeProject ? activeAssets[activeProject.assetIndex] : null;
  const canCycleAssets = activeAssets.length > 1;

  const showPreviousAsset = () => {
    setActiveProject((current) =>
      current
        ? {
            ...current,
            assetIndex: (current.assetIndex - 1 + getProjectAssets(current.project).length) %
              getProjectAssets(current.project).length,
          }
        : null,
    );
  };

  const showNextAsset = () => {
    setActiveProject((current) =>
      current
        ? {
            ...current,
            assetIndex: (current.assetIndex + 1) % getProjectAssets(current.project).length,
          }
        : null,
    );
  };

  return (
    <>
      <div className="page-shell">
        <header className="site-header">
          <div className="container nav-bar">
            <a className="brand-mark" href="#about">
              {siteContent.navigation.brand}
            </a>
            <nav className="nav-links" aria-label={siteContent.navigation.primaryAriaLabel}>
              <a href="#about">{siteContent.navigation.about}</a>
              <a href="#projects">{siteContent.navigation.projects}</a>
            </nav>
            <a className="button button-primary" href={`mailto:${siteContent.links[0].url.replace("mailto:", "")}`}>
              {siteContent.navigation.contact}
            </a>
          </div>
        </header>

        <main>
          <section id="about" className="hero-section">
            <div className="ambient ambient-primary" />
            <div className="ambient ambient-secondary" />

            <div className="container hero-stack">
              <div className="hero-layout">
                <div className="hero-copy">
                  <div className="hero-badge">
                    <span className="hero-badge-dot" aria-hidden="true">
                      •
                    </span>
                    {siteContent.hero.badge}
                  </div>

                  <h1>
                    {siteContent.hero.title.lead} <span>{siteContent.hero.title.accent}</span>
                  </h1>

                  <p className="hero-lead">{siteContent.hero.lead}</p>

                  <div className="identity-meta">
                    <div>
                      <p className="meta-label">{siteContent.hero.connectLabel}</p>
                      <div className="inline-links">
                        {siteContent.links.map((link) => (
                          <a key={link.label} href={link.url}>
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="meta-label">{siteContent.hero.locationLabel}</p>
                      <p className="meta-value">{siteContent.hero.locationValue}</p>
                    </div>
                  </div>
                </div>

                <aside className="portrait-wrap" aria-label={siteContent.hero.portraitAriaLabel}>
                  <div className="portrait-card">
                    <img src={heroPortrait} alt={siteContent.hero.portraitAlt} />
                  </div>
                </aside>
              </div>
            </div>
          </section>

          <section id="projects" className="projects-section">
            <div className="container projects-heading">
              <h2>{siteContent.projectsSection.title}</h2>
              <p className="section-copy">{siteContent.projectsSection.description}</p>
            </div>

            <div className="container project-list">
              {portfolioProjects.map((project, index) => {
                const previewImages = project.images;

                return (
                  <article
                    key={project.id}
                    className={`project-row ${index % 2 === 1 ? "project-row-reverse" : ""}`}
                  >
                    <div className="project-copy">
                      <p className="kicker">{project.kicker}</p>
                      <p className="project-summary">{project.summary}</p>
                      <button
                        type="button"
                        className="button button-ghost"
                        onClick={() => openProjectAsset(project, 0)}
                      >
                        {siteContent.projectsSection.openCaseStudy}
                      </button>
                    </div>

                    <MediaStrip
                      label={`${project.title} ${siteContent.projectsSection.previewGalleryLabel}`}
                    >
                      {project.video ? (
                        <button
                          type="button"
                          className="phone-frame video-frame"
                          onClick={() => openProjectAsset(project, 0)}
                        >
                          <img
                            src={project.cover}
                            alt={`${project.title} ${siteContent.projectsSection.videoPreviewSuffix}`}
                          />
                          <span className="play-button" aria-hidden="true" />
                        </button>
                      ) : null}

                      {previewImages.map((image, imageIndex) => (
                        <button
                          key={image.alt}
                          type="button"
                          className="phone-frame"
                          onClick={() =>
                            openProjectAsset(project, imageIndex + (project.video ? 1 : 0))
                          }
                        >
                          <img src={image.source} alt={image.alt} />
                        </button>
                      ))}
                    </MediaStrip>
                  </article>
                );
              })}
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="container footer-bar">
            <p>{siteContent.footer.description}</p>
            <div className="inline-links">
              {siteContent.links.map((link) => (
                <a key={link.label} href={link.url}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>

      {activeProject && currentAsset ? (
        <div className="modal-backdrop" onClick={() => setActiveProject(null)}>
          <div
            className="modal-card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.project.kicker}
          >
            <button
              type="button"
              className="close-button"
              onClick={() => setActiveProject(null)}
            >
              {siteContent.modal.close}
            </button>

            <div className="modal-layout">
              <div className="modal-media">
                <div className="modal-media-frame">
                  {canCycleAssets ? (
                    <>
                      <button
                        type="button"
                        className="modal-media-nav modal-media-nav-prev"
                        onClick={showPreviousAsset}
                        aria-label={siteContent.modal.previousAsset}
                      >
                        <span aria-hidden="true">←</span>
                      </button>
                      <button
                        type="button"
                        className="modal-media-nav modal-media-nav-next"
                        onClick={showNextAsset}
                        aria-label={siteContent.modal.nextAsset}
                      >
                        <span aria-hidden="true">→</span>
                      </button>
                    </>
                  ) : null}

                  {currentAsset.type === "video" ? (
                    <div className="video-block">
                      <video
                        controls
                        playsInline
                        loop
                        autoPlay
                        poster={currentAsset.video.poster}
                        src={currentAsset.video.source}
                      />
                    </div>
                  ) : (
                    <div className="gallery-card gallery-card-active">
                      <img src={currentAsset.image.source} alt={currentAsset.image.alt} />
                    </div>
                  )}
                </div>

                <div className="modal-media-meta">
                  <p className="modal-media-counter">
                    {activeProject.assetIndex + 1} / {activeAssets.length}
                  </p>
                  <div
                    className="modal-media-thumbs"
                    aria-label={siteContent.modal.assetsAriaLabel}
                  >
                    {activeAssets.map((asset, index) => (
                      <button
                        key={`${asset.type}-${asset.alt}`}
                        type="button"
                        className={`modal-thumb ${index === activeProject.assetIndex ? "is-active" : ""}`}
                        onClick={() =>
                          setActiveProject((current) =>
                            current
                              ? {
                                  ...current,
                                  assetIndex: index,
                                }
                              : null,
                          )
                        }
                        aria-label={`Show ${asset.alt}`}
                        aria-pressed={index === activeProject.assetIndex}
                      >
                        {asset.type === "video" ? (
                          <>
                            <img
                              src={activeProject.project.cover}
                              alt={`${activeProject.project.title} ${siteContent.modal.videoThumbnailSuffix}`}
                            />
                            <span className="modal-thumb-badge" aria-hidden="true">
                              {siteContent.modal.videoBadge}
                            </span>
                          </>
                        ) : (
                          <img src={asset.image.source} alt={asset.image.alt} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-info">
                <p className="project-summary">{activeProject.project.summary}</p>

                {activeProject.project.links?.length ? (
                  <div className="info-group">
                    <p className="meta-label">{siteContent.modal.linksLabel}</p>
                    <div className="inline-links">
                      {activeProject.project.links.map((link) => (
                        <a key={link.label} className="button button-primary" href={link.url}>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
