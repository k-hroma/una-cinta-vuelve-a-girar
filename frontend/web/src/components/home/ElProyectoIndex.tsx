import { Fragment } from 'react';
import type { RichParagraph } from '../../types/pagina';

import '../../styles/components/home/el-proyecto-index-page.css';

type ElProyectoIndexProps = {
  projectDescription: RichParagraph[];
};

export default function ElProyectoIndex({
  projectDescription,
}: ElProyectoIndexProps) {
  return (
    <section className="el-proyecto-home-section">
      <div className="text-container">
        <p className='label-el-proyecto-index'>[EL proyecto]</p>
        {projectDescription.map((paragraph, paragraphIndex) => (
          <p key={paragraphIndex} className='description-el-proyect-index'>
            {paragraph.map((fragment, fragmentIndex) =>
              fragment.underline ? (
                <span key={fragmentIndex} className='sub-description-el-proyect-index'>
                  {fragment.text}
                </span>
              ) : (
                <Fragment key={fragmentIndex}>{fragment.text}</Fragment>
              ),
            )}
          </p>
        ))}
        <div className='credits-el-proyecto-index'>
          <p>— Irene Barco</p>
          <p>Directora de la tesis de Investigación...</p>
        </div>
      </div>
    </section>
  )
}
