import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import { withStyles, Arwes, Row, Appear, Words } from 'arwes';

import { projects } from '../site/settings';
import withTemplate from '../site/withTemplate';
import { Header, Footer, Wrap, Link, Project } from '../site/components';

const styles = theme => ({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    '& $project + $project': {
      marginTop: theme.margin,
    },
  },
  main: {
    flex: 1,
    padding: [theme.padding, 0],
    '& h2': {
      margin: 0,
    },
  },
  project: {
    display: 'block',
  },
  titleRight: {
    float: 'right',
  },
});

class Projects extends React.Component {

  constructor () {
    super(...arguments);
    this.state = {
      // Animations enabled by levels.
      animLvl0: false,
      animLvl1: false,
      animLvl2: false
    };
  }

  componentDidMount () {
    this.setState({ animLvl0: true });
  }

  render () {
    const { animLvl0, animLvl1, animLvl2 } = this.state;
    const { classes, resources } = this.props;

    const list = projects.
      filter(item => !item.private).
      sort((a, b) => moment(b.date).format('x') - moment(a.date).format('x'));

    return (
      <Arwes
        animate
        show={animLvl0}
        showResources={animLvl0}
        background={resources.background}
        pattern={resources.pattern}
      >
        {anim => (
        <div className={classes.root}>

          <Header
            animate
            show={anim.entered}
            animation={{
              onEntered: () => this.setState({ animLvl1: true })
            }}
            onLink={this.onLink}
          />

          <div className={classes.main}>
            <Wrap>
              <Row col s={12}>

                <h2>
                  <Appear
                    className='mdi mdi-chevron-double-right'
                    animate
                    show={animLvl1}
                    animation={{
                      onEntered: () => this.setState({ animLvl2: true })
                    }}
                  />
                  {' '}
                  <Words animate show={animLvl1}>Projects</Words>
                  <Appear className={cx(classes.titleRight, 'mdi mdi-chevron-double-left')} animate show={animLvl1} />
                </h2>

              </Row>
              <Row col noMargin s={12}>

                {list.map(project => (
                <Link
                  key={project.id}
                  className={classes.project}
                  href={project.link}
                  onLink={this.onLink}
                >
                  <Project
                    show={animLvl2}
                    headerSize='h3'
                    header={project.name}
                    description={project.description}
                    type={project.type}
                    scale={project.scale}
                    lang={project.lang}
                    date={moment(project.date).format('YYYY-MM')}
                    image={project.image}
                  />
                </Link>
                ))}

              </Row>
            </Wrap>
          </div>

          <Footer
            animate
            show={anim.entered}
            onLink={this.onLink}
          />

        </div>
        )}
      </Arwes>
    );
  }

  onLink = () => {
    this.setState({ animLvl0: false });
  }
}

export default withTemplate(withStyles(styles)(Projects));
