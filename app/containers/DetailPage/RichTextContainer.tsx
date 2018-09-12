import * as React from 'react';

import { html2json, json2html, RootNode, HTMLNode } from 'html2json';

import * as throttle from 'lodash/throttle';

import { IMAGE_BASE, IMAGE_OPTIMIZE_WEBP, IMAGE_OPTIMIZE } from 'utils/env';
import { webpSupported } from 'utils/support';

import * as defaultImg from 'assets/default.png';

enum LazyLoadStatus {
  INITIAL = '1',
  IN_PROGRESS = '2',
  FINISHED = '3'
}

interface Props extends React.HTMLAttributes<any> {
  html: string
  forwardRef?: (ref: any) => any
}

function processImage(node: HTMLNode): void {
  if (node.node === 'element' && node.tag === 'img') {
    if (node.attr && node.attr.src) {
      const src = node.attr.src;
      node.attr.src = defaultImg;
      node.attr['data-src'] = src;
      node.attr['data-lazyload'] = LazyLoadStatus.INITIAL;
    }
  } else if (node.node === 'element' && !!node.child) {
    node.child.forEach(item => {
      processImage(item);
    });
  }
}

class RichTextContainer extends React.Component<Props> {

  componentDidMount() {
    const imageElements = this.contentElement.querySelectorAll('img');
    if (imageElements.length === 0) {
      return;
    }
    this.scrollEventBind = true;
    // 加载当前视窗的图片
    this.onScroll();
    // 节流
    document.addEventListener('scroll', throttle(this.onScroll, 200));
  }

  componentWillUnmount() {
    if (this.scrollEventBind) {
      document.removeEventListener('scroll', this.onScroll);
    }
  }

  private beforeLazyLoad(): string {
    const { html } = this.props;
    try {
      const node: RootNode = html2json(html);
      const child = node.child;
      child.forEach(item => {
        processImage(item);
      });
      return json2html(node);
    } catch (e) {
      return html;
    }
  }

  scrollEventBind: boolean = false;
  contentElement: HTMLDivElement;

  onContainerLoad = (instance: HTMLDivElement | null) => {
    // forwardRef
    const { forwardRef } = this.props;
    if (forwardRef) {
      forwardRef(instance);
    }
    if (instance) {
      this.contentElement = instance;
    }
  };

  onScroll = () => {
    // 未懒加载的才去加载
    const imageElements = this.contentElement.querySelectorAll(`img[data-lazyload='${LazyLoadStatus.INITIAL}']`);
    if (imageElements.length === 0) {
      return;
    }
    const height = document.body.clientHeight;
    for (let i = 0; i < imageElements.length; i++) {
      const image = imageElements.item(i) as HTMLImageElement;
      const top = image.getBoundingClientRect().top;
      if (top <= height + 200) {
        this.lazyLoadImage(image);
      }
    }
  };

  lazyLoadImage(image: HTMLImageElement) {
    let src = image.getAttribute('data-src');
    if (!src) {
      image.setAttribute('data-lazyload', LazyLoadStatus.FINISHED);
      return;
    }
    if (src.startsWith(IMAGE_BASE)) {
      if (webpSupported) {
        src = `${src}?${IMAGE_OPTIMIZE_WEBP}`;
      } else {
        src = `${src}?${IMAGE_OPTIMIZE}`;
      }
    }
    image.setAttribute('data-lazyload', LazyLoadStatus.IN_PROGRESS);
    const temp = new Image();
    temp.src = src;
    temp.onload = () => {
      image.setAttribute('data-lazyload', LazyLoadStatus.FINISHED);
      image.src = src!;
    };
    temp.onerror = () => {
      image.setAttribute('data-lazyload', LazyLoadStatus.FINISHED);
    };
  }

  render() {
    const html: string = this.beforeLazyLoad();
    const { html: _, forwardRef: __, ...restProps } = this.props;
    return (
      <div
        ref={this.onContainerLoad}
        dangerouslySetInnerHTML={{ __html: html }}
        {...restProps}
      />
    );
  }
}

export default React.forwardRef((props: Props, ref?: any) => {
  return <RichTextContainer {...props} forwardRef={ref} />
});
