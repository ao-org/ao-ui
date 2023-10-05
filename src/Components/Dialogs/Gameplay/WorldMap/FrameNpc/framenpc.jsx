import './framenpc.scss'

export default function Frame({children, contentStyles, styles}) {
  var spacer = {
    width: `35px`,
    height: `35px`
  }
  return (
  <div className={'frame-npc ' + styles}>
    <div className='frame-side-container frame-left'>
        <div style={spacer}></div>
        <div className='frame-center left-image'></div>
        <div style={spacer}></div>
    </div>
    <div className='frame-side-container frame-right'>
      <div style={spacer}></div>
      <div className='frame-center right-image'></div>
      <div style={spacer}></div>
    </div>
    <div className='frame-line-container frame-top'>
        <img style={spacer} src={require(`../../../../../assets/frames/boxmap/boxnpc/topleft.png`)} className='corners' />
        <div className='frame-center image-top'></div>
        <img style={spacer} src={require(`../../../../../assets/frames/boxmap/boxnpc/topright.png`)} className='corners' />
    </div>
    <div className='frame-line-container frame-bottom'>
      <img style={spacer} src={require(`../../../../../assets/frames/boxmap/boxnpc/bottomleft.png`)} className='corners' />
      <div className='frame-center image-bottom'></div>
      <img style={spacer} src={require(`../../../../../assets/frames/boxmap/boxnpc/bottomright.png`)} className='corners' />
    </div>
    <div className={'frame-content ' + contentStyles}>
        {children}
    </div>
  </div>
)}