import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <div className="alt">
        <section>
          <div className="inner">
            <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
            <div className="row">
              <div className="3u 12u$(small)"><p></p></div>
              <div className="6u 12u$(small)">
                <h1>{post.frontmatter.title}</h1>
                <p>
                  {post.frontmatter.date}
                </p>          
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
              </div>
              <div className="3u 12u$(small)"><p></p></div>
            </div>
            <hr className="major" />
          </div>
        </section>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
