import './Banner.scss'
export default function Banner(props) {
    return (

        <div className="banner-image full-width full-height flex justify-content-center align-items-center">
            <div className="section-header text-center title">
                <h2 className="fw-bold display-1 light">
                    <span className="b-class-secondary">YOUR</span>
                    Personal Jukebox <br />
                    <span className="b-class-secondary">YOUR</span> Favorite Artists <br />
                    <span className="b-class-secondary">YOUR</span> Custom Playlists <br />
                    <span className="b-class-secondary">ONE</span> Place</h2>
            </div>
        </div>
    )
}