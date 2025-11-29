import { useEffect, useState } from "react";
import noimage from "../../../assets/images/noimage.png";
import type { Bird } from "../../../types/Bird";

interface BirdModalProps {
  bird: Bird;
  onClose: () => void;
}

interface WikiData {
  habitat: string | null;
  region: string | null;
  summary: string | null;
  funFacts: string | null;
  conservation: string | null;
}

export default function BirdModal({ bird, onClose }: BirdModalProps) {
  const [wiki, setWiki] = useState<WikiData>({
    habitat: null,
    region: null,
    summary: null,
    funFacts: null,
    conservation: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWiki = async () => {
      try {
        setLoading(true);
        const title = encodeURIComponent(bird.scientificName);
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`
        );

        if (!res.ok) {
          setWiki({
            habitat: "Not available",
            region: "Not available",
            summary: "Not available",
            funFacts: "Not available",
            conservation: "Not available",
          });
          return;
        }

        const data = await res.json();
        const extract: string = data.extract ?? "";

        const habitat =
          extract.match(/(habitat|lives in|found in|native to)[^.]+/i)?.[0] ??
          "Not available";

        const region =
          extract.match(
            /(Africa|Asia|Europe|North America|South America|Australia|Oceania|worldwide|cosmopolitan)/i
          )?.[0] ?? "Not available";

        const funFacts = (() => {
          const sentences = extract
            .split(". ")
            .map((s) => s.trim())
            .filter((s) => s.length > 60);
          const genericPhrases = [
            "it is a species",
            "this species is",
            "it belongs to",
            "it is found in",
            "the family",
            "the genus",
            "it is native to",
          ];
          const keywords = [
            "migrates",
            "nests",
            "feeds",
            "calls",
            "dances",
            "colorful",
            "rare",
            "unique",
            "remarkable",
            "lifespan",
            "speed",
            "size",
            "behavior",
            "interesting",
          ];
          const meaningful = sentences.filter(
            (sentence) =>
              !genericPhrases.some((phrase) =>
                sentence.toLowerCase().includes(phrase)
              )
          );
          const quirky = meaningful.find((sentence) =>
            keywords.some((keyword) => sentence.toLowerCase().includes(keyword))
          );
          return (quirky || meaningful[0] || "Not available") + ".";
        })();

        let conservation = "Not available";
        if (data.wikibase_item) {
          const wikidataRes = await fetch(
            `https://www.wikidata.org/wiki/Special:EntityData/${data.wikibase_item}.json`
          );
          if (wikidataRes.ok) {
            const wikidataJson = await wikidataRes.json();
            const entity = wikidataJson.entities[data.wikibase_item];
            const statusClaim =
              entity.claims?.P141?.[0]?.mainsnak?.datavalue?.value?.id;
            if (statusClaim) {
              const statusLabelRes = await fetch(
                `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${statusClaim}&format=json&origin=*`
              );
              if (statusLabelRes.ok) {
                const statusLabelJson = await statusLabelRes.json();
                conservation =
                  statusLabelJson.entities[statusClaim]?.labels?.en?.value ||
                  "Not available";
              }
            }
          }
        }

        setWiki({
          habitat,
          region,
          summary: extract || "Not available",
          funFacts,
          conservation,
        });
      } catch (err) {
        console.warn("Wiki summary error:", err);
        setWiki({
          habitat: "Not available",
          region: "Not available",
          summary: "Not available",
          funFacts: "Not available",
          conservation: "Not available",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWiki();
  }, [bird.scientificName]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="rounded-2xl shadow-2xl overflow-y-auto max-h-[80vh] w-full max-w-4xl p-6 relative animate-slide-up flex flex-col md:flex-row gap-6 modal-scrollbar"
        style={{
          backgroundColor: "var(--color-card-dark)",
          color: "var(--color-text)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl transition-colors"
          style={{ color: "var(--color-text-secondary)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--color-text)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--color-text-secondary)")
          }
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="shrink-0 md:w-1/2 flex justify-center items-center bg-card-dark rounded-xl shadow-inner p-2">
          <img
            src={bird.imageUrl || noimage}
            alt={bird.commonName}
            className="object-contain w-full h-64 md:h-full rounded-xl"
            onError={(e) => (e.currentTarget.src = noimage)}
          />
        </div>

        <div className="flex-1 flex flex-col justify-start md:justify-between gap-4 p-4 md:p-6">
          <div className="text-center md:text-left">
            <h2
              className="text-3xl font-bold"
              style={{ color: "var(--color-text)" }}
            >
              {bird.commonName}
            </h2>
            <p
              className="italic"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {bird.scientificName}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <i
                className="fas fa-feather"
                style={{ color: "var(--color-success)" }}
              ></i>
              <div>
                <p
                  className="font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  Order
                </p>
                <p style={{ color: "var(--color-text-secondary)" }}>
                  {bird.order || "Unknown"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <i
                className="fas fa-globe"
                style={{ color: "var(--color-success-dark)" }}
              ></i>
              <div>
                <p
                  className="font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  Category
                </p>
                <p style={{ color: "var(--color-text-secondary)" }}>
                  {bird.category || "Unknown"}
                </p>
              </div>
            </div>
          </div>

          <hr
            style={{ borderColor: "var(--color-border-dark)" }}
            className="my-2"
          />

          {loading ? (
            <p
              className="text-center"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Loading info...
            </p>
          ) : (
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex gap-2">
                <i
                  className="fas fa-tree"
                  style={{ color: "var(--color-success)" }}
                ></i>
                <p
                  className="font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  Habitat:
                </p>
                <p style={{ color: "var(--color-text-secondary)" }}>
                  {wiki.habitat}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <i
                  className="fas fa-globe"
                  style={{ color: "var(--color-success-dark)" }}
                ></i>
                <p
                  className="font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  Region:
                </p>
                <p style={{ color: "var(--color-text-secondary)" }}>
                  {wiki.region}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <i
                  className="fas fa-heartbeat"
                  style={{ color: "#ef4444" }}
                ></i>
                <p
                  className="font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  Conservation:
                </p>
                <p style={{ color: "var(--color-text-secondary)" }}>
                  {wiki.conservation}
                </p>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: "var(--color-success-dark)",
                  borderColor: "var(--color-success)",
                  color: "var(--color-text)",
                }}
              >
                <p
                  className="font-semibold mb-1"
                  style={{ color: "var(--color-text)" }}
                >
                  Fun Fact
                </p>
                <p style={{ color: "var(--color-text)" }}>{wiki.funFacts}</p>
              </div>

              <div className="py-2 text-justify text-sm">
                <span
                  className="font-bold"
                  style={{ color: "var(--color-text)" }}
                >
                  Summary:
                </span>{" "}
                <span style={{ color: "var(--color-text-secondary)" }}>
                  {wiki.summary}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
