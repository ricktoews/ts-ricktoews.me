import { useRef, useState } from 'react';
import { SiteHeader, SiteHeaderBackground, SiteHeaderOverlay } from './masthead-elements';
import { useOnClickOutside } from '../../hooks';
import Burger from './nav/Burger';
import Menu from './nav/Menu';
import styled from 'styled-components';


function Masthead(props: any) {
  const { title, setCategoryFilter, showFilter, children } = props;
	const [open, setOpen] = useState(false);

	const node = useRef(null); 
	useOnClickOutside(node, () => setOpen(false));

  return (
    <SiteHeader>
      <SiteHeaderBackground>
        Masthead
        <SiteHeaderOverlay>
					<div ref={node}>
						<Burger open={open} setOpen={setOpen}/>
						<Menu open={open}/>
					</div>
					{children}
					<div className="title">{title}</div>
				</SiteHeaderOverlay>

      </SiteHeaderBackground>
    </SiteHeader>
  )
}

export default Masthead;