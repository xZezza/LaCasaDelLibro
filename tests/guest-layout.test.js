import test from 'node:test';
import assert from 'node:assert/strict';
import guests from '../src/data/library-visitors.json' with {type:'json'};
import {shelfGuestPosition, visitorScale} from '../src/lib/guest-layout.js';
const creatures=guests.filter(guest=>guest.kind==='creature');
const maxScale=Math.max(...creatures.map(guest=>visitorScale(guest,'shelf')));
const row={left:20,right:650,top:30,bottom:158,occupiedRight:240};

test('shelf visits reserve enough room for every approved creature, its name and the hover zoom',()=>{
  const position=shelfGuestPosition([row],{maxScale});
  assert.ok(position);
  for(const guest of creatures){
    const art=position.size*visitorScale(guest,'shelf');
    const floor=position.top+position.size;
    for(const zoom of [1,1.2])for(const arrival of [-12,0,12]){
      const figureLeft=position.left-art*(zoom-1)/2+arrival;
      const figureRight=position.left+art*(1+zoom)/2+arrival;
      const figureTop=floor-art*zoom;
      // The name can be as wide as the host, including for a small cat.
      const nameLeft=position.left+art/2-position.size*zoom/2+arrival;
      const nameRight=position.left+art/2+position.size*zoom/2+arrival;
      const nameTop=floor-(art+17)*zoom;
      assert.ok(Math.min(figureLeft,nameLeft)>=row.occupiedRight+12-1e-6,guest.id);
      assert.ok(Math.max(figureRight,nameRight)<=row.right-12+1e-6,guest.id);
      assert.ok(Math.min(figureTop,nameTop)>=row.top+12-1e-6,guest.id);
      assert.ok(floor<=row.bottom,guest.id);
    }
  }
});

test('crowded, short and scrolled shelves suppress a visit rather than overlap books or labels',()=>{
  assert.equal(shelfGuestPosition([{...row,occupiedRight:600}],{maxScale}),null);
  assert.equal(shelfGuestPosition([{...row,bottom:80}],{maxScale}),null);
  assert.equal(shelfGuestPosition([{...row,occupiedRight:720}],{maxScale}),null);
  assert.equal(shelfGuestPosition([], {maxScale}),null);
});

test('visits choose a safe shelf and return to a safe position after rearranging items',()=>{
  const rows=[row,{...row,top:190,bottom:318,occupiedRight:600}];
  const first=shelfGuestPosition(rows,{maxScale});
  assert.ok(first.top<row.bottom);
  const moved=shelfGuestPosition([{...rows[0],occupiedRight:620},{...rows[1],occupiedRight:200}],{maxScale});
  assert.ok(moved.top>row.bottom);
  const crowded=shelfGuestPosition(rows.map(r=>({...r,occupiedRight:640})),{maxScale});
  assert.equal(crowded,null);
});

test('relative creature sizes remain distinct in the Potter quote and on shelves',()=>{
  const cat=creatures.find(guest=>guest.id==='crookshanks');
  assert.equal(visitorScale(cat,'potter'),cat.scale);
  assert.ok(visitorScale(cat,'shelf')<visitorScale(cat,'potter'));
  for(const human of guests.filter(guest=>guest.kind!=='creature'))assert.equal(visitorScale(human,'hero'),human.scale||1);
});
