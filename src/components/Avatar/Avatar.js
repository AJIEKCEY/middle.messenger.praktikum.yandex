import "./avatar.css"

class Avatar{
  constructor(data, targetEl) {
    this.targetEl = targetEl;
    this.data = data;
  }

  template (data = this.data) {
    return `
      <div class="avatar"></div>
    `}
}

export default Avatar