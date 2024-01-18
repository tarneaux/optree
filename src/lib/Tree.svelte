<div class="tree">
  <ul>
    <li>
      <div>+</div>
      <ul>
        <li>
          <div>+</div>
          <ul>
            <li>
              2
            </li>
            <li>
              4
            </li>
          </ul>
        </li>
        <li>
          <div>-</div>
          <ul>
            <li>
              <div>-</div>
              <ul>
                <li>
                  2
                </li>
                <li>
                  4
                </li>
              </ul>
            </li>
            <li>
              4
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</div>

<style>

.tree {
  font-size: 10rem;
}

.tree ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: center;
  display: flex;
}

.tree>ul>li ul {
  position: relative;
}

.tree>ul>li ul:before {
  content: '';
  background-color: red;
  position: absolute;
  top: 0;
  left: 20%;
  height: 1px;
  width: 60%;
}

.tree li {
  margin-right: 20px;
}

.tree li:last-child {
  margin-right: 0;
}
</style>
