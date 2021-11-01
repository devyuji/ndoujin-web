import { motion } from "framer-motion";
import { FC } from "react";

interface FiltersProps {
  language: String;
  filter: (e: any) => void;
}

const Filters: FC<FiltersProps> = ({ language, filter }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "backInOut",
      }}
      exit={{ opacity: 0 }}
      className="filter"
    >
      <h2>Language :</h2>
      <div className="language">
        <input
          type="checkbox"
          id="all"
          name="all"
          value="all"
          checked={language === "all"}
          onChange={filter}
        />
        <label htmlFor="all">All</label>

        <input
          type="checkbox"
          id="english"
          name="english"
          checked={language === "english"}
          value="english"
          onChange={filter}
        />
        <label htmlFor="english">English (EN)</label>

        <input
          type="checkbox"
          id="japanese"
          name="japanese"
          checked={language === "japanese"}
          value="japanese"
          onChange={filter}
        />
        <label htmlFor="japanese">Japanese (JA)</label>

        <input
          type="checkbox"
          id="chinese"
          name="chinese"
          checked={language === "chinese"}
          value="chinese"
          onChange={filter}
        />
        <label htmlFor="chinese">Chinese (CH)</label>
      </div>
    </motion.div>
  );
};

export default Filters;
